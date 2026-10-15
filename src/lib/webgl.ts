/** True when a WebGL context can actually be created (guards the optional 3D hero layer). */
export function canUseWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Respect Data Saver / very slow connections by skipping the decorative 3D layer. */
export function prefersLightweight(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''))
}
