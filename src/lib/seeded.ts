/** Tiny seeded RNG so generated layouts are stable across renders. */
export function seeded(seed = 7) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}
