import { Bus, Car, CarFront, Van } from 'lucide-react'
import type { VehicleIcon } from '../../data/cab'

const map = { car: Car, suv: CarFront, van: Van, bus: Bus }

/** Illustrative tile used until real fleet photos are supplied. */
export function VehicleTile({ icon, size = 56 }: { icon: VehicleIcon; size?: number }) {
  const Icon = map[icon]
  return (
    <span className="vtile" aria-hidden="true">
      <Icon size={size} strokeWidth={1.4} />
    </span>
  )
}
