import * as THREE from 'three'

/** Soft radial sprite used for flame glows, embers and the sun. Caller owns disposal. */
export function makeGlowTexture() {
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

/** Half-cup profile for a clay diya (LatheGeometry). */
export const diyaProfile = () =>
  [[0.001, 0], [0.16, 0.01], [0.3, 0.07], [0.4, 0.17], [0.42, 0.24], [0.36, 0.23], [0.3, 0.14], [0.001, 0.1]].map(([x, y]) => new THREE.Vector2(x, y))

/** Tiny seeded RNG so layouts are stable across renders / HMR. */
export function seeded(seed = 7) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}
