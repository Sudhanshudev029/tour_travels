import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'

interface Props {
  /** Element that receives a subtle parallax transform (the hero photograph). */
  parallaxEl: RefObject<HTMLElement | null>
  reducedMotion: boolean
  compact: boolean
}

/** Soft radial sprite shared by flame glows and embers. */
function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,230,170,1)')
  grad.addColorStop(0.25, 'rgba(255,170,70,0.55)')
  grad.addColorStop(1, 'rgba(255,120,20,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

const dummy = new THREE.Object3D()

/** Floating diyas: one instanced bowl, flame and glow each (3 draw calls for all lamps). */
function Diyas({ count, active, reduced }: { count: number; active: boolean; reduced: boolean }) {
  const viewport = useThree((s) => s.viewport)
  const bowls = useRef<THREE.InstancedMesh>(null)
  const flames = useRef<THREE.InstancedMesh>(null)
  const glows = useRef<THREE.InstancedMesh>(null)
  const glowTex = useMemo(makeGlowTexture, [])
  useEffect(() => () => glowTex.dispose(), [glowTex])

  const bowlProfile = useMemo(
    () => [[0.001, 0], [0.16, 0.01], [0.3, 0.07], [0.4, 0.17], [0.42, 0.24], [0.36, 0.23], [0.3, 0.14], [0.001, 0.1]].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  )

  const seeds = useMemo(() => {
    // Deterministic pseudo-random layout so SSR/HMR don't reshuffle the lamps.
    let s = 7
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    return Array.from({ length: count }, (_, i) => ({
      x: (i / (count - 1) - 0.5) * 1.1 + (rnd() - 0.5) * 0.08,
      y: -0.2 - rnd() * 0.5,
      z: -2 + rnd() * 3,
      phase: rnd() * 6.28,
      scale: 0.55 + rnd() * 0.5,
    }))
  }, [count])

  const place = (t: number) => {
    const b = bowls.current, f = flames.current, g = glows.current
    if (!b || !f || !g) return
    const halfW = viewport.width / 2
    const halfH = viewport.height / 2
    for (let i = 0; i < count; i++) {
      const d = seeds[i]
      const x = d.x * viewport.width * 0.95 + Math.sin(t * 0.15 + d.phase) * 0.12
      const depthScale = 1 + d.z * 0.06
      const y = -halfH * (0.74 + (-d.y - 0.2) * 0.36) + Math.sin(t * 0.9 + d.phase) * 0.035
      const sc = d.scale * depthScale * 0.7
      dummy.rotation.set(Math.sin(t * 0.7 + d.phase) * 0.04, 0, Math.cos(t * 0.6 + d.phase) * 0.04)
      dummy.position.set(Math.max(-halfW, Math.min(halfW, x)), y, d.z)
      dummy.scale.setScalar(sc)
      dummy.updateMatrix()
      b.setMatrixAt(i, dummy.matrix)

      const flick = reduced ? 1 : 1 + Math.sin(t * 9 + d.phase * 3) * 0.08 + Math.sin(t * 5.3 + d.phase) * 0.06
      dummy.position.y = y + 0.3 * sc
      dummy.scale.set(sc * 0.1, sc * 0.22 * flick, sc * 0.1)
      dummy.updateMatrix()
      f.setMatrixAt(i, dummy.matrix)

      dummy.position.y = y + 0.34 * sc
      dummy.scale.setScalar(sc * (0.95 + (flick - 1) * 1.4))
      dummy.updateMatrix()
      g.setMatrixAt(i, dummy.matrix)
    }
    b.instanceMatrix.needsUpdate = f.instanceMatrix.needsUpdate = g.instanceMatrix.needsUpdate = true
  }

  // Initial placement (also the single frame rendered under reduced motion / when paused).
  useEffect(() => {
    place(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height, count])
  useFrame(({ clock }) => {
    if (active && !reduced) place(clock.elapsedTime)
  })

  return (
    <group>
      <instancedMesh ref={bowls} args={[undefined, undefined, count]} frustumCulled={false}>
        <latheGeometry args={[bowlProfile, 18]} />
        <meshStandardMaterial color="#8c3d17" roughness={0.85} metalness={0.05} emissive="#3a1405" emissiveIntensity={0.7} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh ref={flames} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial color="#ffc766" />
      </instancedMesh>
      <instancedMesh ref={glows} args={[undefined, undefined, count]} frustumCulled={false}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
      </instancedMesh>
    </group>
  )
}

/** Slow rising embers / motes. Positions are mutated in place — no per-frame allocation. */
function Embers({ count, active, reduced }: { count: number; active: boolean; reduced: boolean }) {
  const viewport = useThree((s) => s.viewport)
  const tex = useMemo(makeGlowTexture, [])
  useEffect(() => () => tex.dispose(), [tex])
  const ref = useRef<THREE.Points>(null)
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const speed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.2
      pos[i * 3 + 1] = Math.random()
      pos[i * 3 + 2] = -2 + Math.random() * 4
      speed[i] = 0.015 + Math.random() * 0.03
    }
    return { pos, speed, attr: new THREE.BufferAttribute(new Float32Array(count * 3), 3) }
  }, [count])

  const write = (t: number) => {
    const a = data.attr.array as Float32Array
    for (let i = 0; i < count; i++) {
      a[i * 3] = data.pos[i * 3] * viewport.width + Math.sin(t * 0.3 + i) * 0.15
      a[i * 3 + 1] = (data.pos[i * 3 + 1] - 0.5) * viewport.height
      a[i * 3 + 2] = data.pos[i * 3 + 2]
    }
    data.attr.needsUpdate = true
  }
  useEffect(() => {
    write(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height])

  useFrame(({ clock }, dt) => {
    if (!active || reduced) return
    for (let i = 0; i < count; i++) {
      let y = data.pos[i * 3 + 1] + data.speed[i] * Math.min(dt, 0.05)
      if (y > 1) y = 0
      data.pos[i * 3 + 1] = y
    }
    write(clock.elapsedTime)
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry attach="geometry">
        <primitive object={data.attr} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.22} sizeAttenuation transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/** Golden light streaks drifting over the lower river. A single transparent quad. */
function RiverShimmer({ active, reduced }: { active: boolean; reduced: boolean }) {
  const viewport = useThree((s) => s.viewport)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame(({ clock }) => {
    if (active && !reduced) uniforms.uTime.value = clock.elapsedTime
  })
  return (
    <mesh position={[0, -viewport.height * 0.32, -3]} scale={[viewport.width * 1.5, viewport.height * 0.42, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          varying vec2 vUv; uniform float uTime;
          void main(){
            float l = 0.0;
            for (int i = 0; i < 3; i++) {
              float f = float(i) + 1.0;
              float w = sin(vUv.x * (22.0 * f) + uTime * (0.45 + 0.2 * f) + vUv.y * (34.0 + f * 11.0));
              l += smoothstep(0.86, 1.0, w) / f;
            }
            float fade = pow(1.0 - vUv.y, 1.6) * smoothstep(0.0, 0.08, vUv.y);
            gl_FragColor = vec4(1.0, 0.72, 0.36, l * 0.2 * fade);
          }`}
      />
    </mesh>
  )
}

/** Eases the group and the photograph toward the pointer. Reads a ref; never sets React state. */
function Parallax({ parallaxEl, active, reduced, children }: { parallaxEl: Props['parallaxEl']; active: boolean; reduced: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  useFrame(() => {
    if (!active || reduced) return
    cur.current.x += (target.current.x - cur.current.x) * 0.05
    cur.current.y += (target.current.y - cur.current.y) * 0.05
    const { x, y } = cur.current
    if (group.current) group.current.position.set(x * -0.25, y * 0.12, 0)
    const el = parallaxEl.current
    if (el) el.style.transform = `translate3d(${(x * -14).toFixed(2)}px, ${(y * -8).toFixed(2)}px, 0) scale(1.05)`
  })
  return <group ref={group}>{children}</group>
}

export default function HeroScene3D({ parallaxEl, reducedMotion, compact }: Props) {
  const [visible, setVisible] = useState(true)
  const [tabVisible, setTabVisible] = useState(!document.hidden)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    const onVis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const active = visible && tabVisible && !reducedMotion
  return (
    <div ref={wrap} className="hero__scene" aria-hidden="true">
      <Canvas
        frameloop={active ? 'always' : 'demand'}
        dpr={compact ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.9} color="#ffd9a8" />
        <directionalLight position={[2, 4, 5]} intensity={1.6} color="#ffb067" />
        <Parallax parallaxEl={parallaxEl} active={active} reduced={reducedMotion}>
          <RiverShimmer active={active} reduced={reducedMotion} />
          <Embers count={compact ? 36 : 90} active={active} reduced={reducedMotion} />
          <Diyas count={compact ? 6 : 11} active={active} reduced={reducedMotion} />
        </Parallax>
      </Canvas>
    </div>
  )
}
