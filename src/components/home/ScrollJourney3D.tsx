import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { diyaProfile, makeGlowTexture, seeded } from '../../lib/three-shared'

interface Props {
  /** The section whose scroll position drives the camera. */
  host: RefObject<HTMLElement | null>
  active: boolean
  compact: boolean
}

const LEN = 110
const DUSK = new THREE.Color('#1b0910')
const DAWN = new THREE.Color('#6e2c12')
const dummy = new THREE.Object3D()
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** 0 when the section's top enters the viewport → 1 when its bottom leaves. */
function sectionProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return clamp01((window.innerHeight - r.top) / (r.height + window.innerHeight))
}

/** Drives camera, sky colour and sunrise from scroll. Reads the DOM; never sets React state. */
function Rig({ host, active }: Pick<Props, 'host' | 'active'>) {
  const { camera, scene } = useThree()
  const sun = useRef<THREE.Mesh>(null)
  const smooth = useRef(0)
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(Array.from({ length: 8 }, (_, i) => new THREE.Vector3(Math.sin(i * 1.15) * 3.2, 1.5, -(i * LEN) / 7))),
    [],
  )
  const tmp = useMemo(() => ({ p: new THREE.Vector3(), l: new THREE.Vector3(), c: new THREE.Color() }), [])

  useEffect(() => {
    scene.background = DUSK.clone()
    scene.fog = new THREE.Fog(DUSK.clone(), 6, 72)
  }, [scene])

  useFrame(() => {
    const el = host.current
    if (!el || !active) return
    smooth.current += (sectionProgress(el) - smooth.current) * 0.07
    const p = smooth.current
    const t = p * 0.86
    curve.getPoint(t, tmp.p)
    curve.getPoint(Math.min(1, t + 0.05), tmp.l)
    camera.position.set(tmp.p.x, tmp.p.y + p * 0.6, tmp.p.z)
    camera.lookAt(tmp.l.x, 2.2 + p * 2.6, tmp.l.z)
    tmp.c.copy(DUSK).lerp(DAWN, p * p)
    ;(scene.background as THREE.Color).copy(tmp.c)
    ;(scene.fog as THREE.Fog).color.copy(tmp.c)
    if (sun.current) {
      sun.current.position.y = 1 + p * 17
      ;(sun.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + p * 0.65
    }
  })

  return (
    <mesh ref={sun} position={[0, 1, -LEN - 24]} scale={[58, 58, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
    </mesh>
  )
}

/** River surface: dark water, drifting gold ripples and a sun glitter path that strengthens at dawn. */
function River({ active }: { active: boolean }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame(({ clock }) => {
    if (active) uniforms.uTime.value = clock.elapsedTime
  })
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -LEN / 2 - 30]}>
      <planeGeometry args={[240, LEN + 140]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`}
        fragmentShader={`
          varying vec3 vW; uniform float uTime;
          void main(){
            float d = distance(vW, cameraPosition);
            float rip = 0.0;
            for (int i = 0; i < 3; i++) {
              float f = float(i) + 1.0;
              rip += smoothstep(0.88, 1.0, sin(vW.x * 0.9 * f + vW.z * 0.55 * f + uTime * (0.5 + 0.2 * f))) / f;
            }
            float glitter = exp(-pow(vW.x * 0.07, 2.0)) * smoothstep(0.55, 1.0, sin(vW.z * 1.7 + uTime * 1.3) * sin(vW.x * 2.3 - uTime));
            vec3 col = vec3(0.07, 0.03, 0.05) + vec3(1.0, 0.62, 0.28) * (rip * 0.12 + glitter * 0.35);
            float a = (1.0 - smoothstep(30.0, 85.0, d)) * 0.92;
            gl_FragColor = vec4(col, a);
          }`}
      />
    </mesh>
  )
}

/** Dusk bank silhouettes: stepped ghat blocks, a few shikhara-like spires and warm window lights. */
function Banks({ compact }: { compact: boolean }) {
  const blocks = useRef<THREE.InstancedMesh>(null)
  const spires = useRef<THREE.InstancedMesh>(null)
  const per = compact ? 16 : 28
  const spireCount = compact ? 5 : 9
  const { lights, layout, spireLayout } = useMemo(() => {
    const r = seeded(11)
    const layout = Array.from({ length: per * 2 }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1
      const z = -4 - (Math.floor(i / 2) / per) * (LEN + 30) - r() * 3
      const h = 2 + r() * 7
      return { x: side * (15 + r() * 7), z, w: 3 + r() * 4, h, d: 4 + r() * 3 }
    })
    const spireLayout = Array.from({ length: spireCount }, (_, i) => ({ x: (i % 2 ? 1 : -1) * (17 + r() * 4), z: -12 - (i / spireCount) * (LEN + 10), h: 7 + r() * 5 }))
    const pts = new Float32Array(layout.length * 2 * 3)
    layout.forEach((b, i) => {
      for (let k = 0; k < 2; k++) {
        const o = (i * 2 + k) * 3
        pts[o] = b.x + (b.x > 0 ? -b.w / 2 - 0.05 : b.w / 2 + 0.05)
        pts[o + 1] = 0.8 + r() * (b.h - 1)
        pts[o + 2] = b.z + (r() - 0.5) * b.d
      }
    })
    return { lights: pts, layout, spireLayout }
  }, [per, spireCount])
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])

  useEffect(() => {
    layout.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.scale.set(b.w, b.h, b.d)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      blocks.current?.setMatrixAt(i, dummy.matrix)
    })
    spireLayout.forEach((s, i) => {
      dummy.position.set(s.x, s.h / 2 + 2, s.z)
      dummy.scale.set(2.2, s.h, 2.2)
      dummy.updateMatrix()
      spires.current?.setMatrixAt(i, dummy.matrix)
    })
    if (blocks.current) blocks.current.instanceMatrix.needsUpdate = true
    if (spires.current) spires.current.instanceMatrix.needsUpdate = true
  }, [layout, spireLayout])

  return (
    <group>
      <instancedMesh ref={blocks} args={[undefined, undefined, layout.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#14070b" />
      </instancedMesh>
      <instancedMesh ref={spires} args={[undefined, undefined, spireLayout.length]} frustumCulled={false}>
        <coneGeometry args={[0.55, 1, 6]} />
        <meshBasicMaterial color="#170810" />
      </instancedMesh>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lights, 3]} />
        </bufferGeometry>
        <pointsMaterial map={glow} size={1.1} sizeAttenuation transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} color="#ffc27a" />
      </points>
    </group>
  )
}

/** Diyas drifting on the water along the camera's path. Three instanced draw calls for all lamps. */
function RiverDiyas({ count, active }: { count: number; active: boolean }) {
  const bowls = useRef<THREE.InstancedMesh>(null)
  const flames = useRef<THREE.InstancedMesh>(null)
  const glows = useRef<THREE.InstancedMesh>(null)
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])
  const profile = useMemo(diyaProfile, [])
  const seeds = useMemo(() => {
    const r = seeded(23)
    return Array.from({ length: count }, () => ({
      x: (r() < 0.5 ? -1 : 1) * (1.6 + r() * 9),
      z: -2 - r() * (LEN + 8),
      ph: r() * 6.28,
      s: 0.55 + r() * 0.5,
    }))
  }, [count])

  const place = (t: number) => {
    const b = bowls.current, f = flames.current, g = glows.current
    if (!b || !f || !g) return
    for (let i = 0; i < count; i++) {
      const d = seeds[i]
      const x = d.x + Math.sin(t * 0.25 + d.ph) * 0.3
      const y = 0.06 + Math.sin(t * 1.1 + d.ph) * 0.03
      dummy.rotation.set(Math.sin(t * 0.8 + d.ph) * 0.05, d.ph, Math.cos(t * 0.7 + d.ph) * 0.05)
      dummy.position.set(x, y, d.z)
      dummy.scale.setScalar(d.s)
      dummy.updateMatrix()
      b.setMatrixAt(i, dummy.matrix)
      const fl = 1 + Math.sin(t * 9 + d.ph * 3) * 0.09 + Math.sin(t * 5.1 + d.ph) * 0.06
      dummy.rotation.set(0, 0, 0)
      dummy.position.set(x, y + 0.3 * d.s, d.z)
      dummy.scale.set(d.s * 0.1, d.s * 0.22 * fl, d.s * 0.1)
      dummy.updateMatrix()
      f.setMatrixAt(i, dummy.matrix)
      dummy.position.y = y + 0.34 * d.s
      dummy.scale.setScalar(d.s * 1.5 * (0.95 + (fl - 1) * 1.5))
      dummy.updateMatrix()
      g.setMatrixAt(i, dummy.matrix)
    }
    b.instanceMatrix.needsUpdate = f.instanceMatrix.needsUpdate = g.instanceMatrix.needsUpdate = true
  }
  useEffect(() => place(0), []) // eslint-disable-line react-hooks/exhaustive-deps
  useFrame(({ clock }) => {
    if (active) place(clock.elapsedTime)
  })

  return (
    <group>
      <instancedMesh ref={bowls} args={[undefined, undefined, count]} frustumCulled={false}>
        <latheGeometry args={[profile, 14]} />
        <meshBasicMaterial color="#7a3414" side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh ref={flames} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color="#ffc766" fog={false} />
      </instancedMesh>
      <instancedMesh ref={glows} args={[undefined, undefined, count]} frustumCulled={false}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.85} />
      </instancedMesh>
    </group>
  )
}

/** Sparks rising through the whole corridor. Positions updated in place. */
function Sparks({ count, active }: { count: number; active: boolean }) {
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])
  const attr = useMemo(() => {
    const r = seeded(5)
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (r() - 0.5) * 30
      a[i * 3 + 1] = r() * 9
      a[i * 3 + 2] = -r() * (LEN + 20)
    }
    return new THREE.BufferAttribute(a, 3)
  }, [count])
  useFrame((_, dt) => {
    if (!active) return
    const a = attr.array as Float32Array
    const step = Math.min(dt, 0.05)
    for (let i = 0; i < count; i++) {
      let y = a[i * 3 + 1] + step * (0.25 + (i % 5) * 0.08)
      if (y > 9) y = 0
      a[i * 3 + 1] = y
    }
    attr.needsUpdate = true
  })
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <primitive object={attr} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial map={glow} size={0.35} sizeAttenuation transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function ScrollJourney3D({ host, active, compact }: Props) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={compact ? 1 : [1, 1.5]}
      camera={{ position: [0, 1.5, 0], fov: 58, near: 0.1, far: 220 }}
      gl={{ antialias: false, powerPreference: 'low-power' }}
    >
      <Rig host={host} active={active} />
      <River active={active} />
      <Banks compact={compact} />
      <RiverDiyas count={compact ? 34 : 80} active={active} />
      <Sparks count={compact ? 60 : 140} active={active} />
    </Canvas>
  )
}
