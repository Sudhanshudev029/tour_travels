import { seeded } from '../../lib/seeded'

const N = 25

/** Decorative QR-style graphic. It encodes nothing and will not scan — the real ticket's QR is never published. */
export function SampleQr() {
  const rnd = seeded(41)
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7)
  const cells: string[] = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (finder(x, y)) continue
      if (rnd() > 0.52) cells.push(`M${x} ${y}h1v1h-1z`)
    }
  }
  const eye = (ox: number, oy: number) => (
    <g key={`${ox}${oy}`} transform={`translate(${ox} ${oy})`}>
      <rect width="7" height="7" fill="#111" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" fill="#111" />
    </g>
  )
  return (
    <svg className="qr" viewBox={`-1 -1 ${N + 2} ${N + 2}`} role="img" aria-label="Sample QR code placeholder — not scannable" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="#fff" />
      <path d={cells.join('')} fill="#111" />
      {eye(0, 0)}
      {eye(N - 7, 0)}
      {eye(0, N - 7)}
    </svg>
  )
}
