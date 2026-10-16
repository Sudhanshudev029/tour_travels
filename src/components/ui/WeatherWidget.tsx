import { Droplets, Sunrise, Sunset, Wind } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface Weather {
  temp: number
  humidity: number
  wind: number
  max: number
  min: number
  sunrise: string
  sunset: string
}

// Varanasi, via the free Open-Meteo API (no key, no personal data sent).
const URL =
  'https://api.open-meteo.com/v1/forecast?latitude=25.3176&longitude=82.9739&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKolkata&forecast_days=1'

const time = (iso: string) => new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })

/** Live Varanasi weather. Renders nothing if the request fails, so it can never break the page. */
export function WeatherWidget() {
  const ref = useReveal<HTMLDivElement>()
  const [w, setW] = useState<Weather | null>(null)
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  useEffect(() => {
    const ac = new AbortController()
    fetch(URL, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) =>
        setW({
          temp: d.current.temperature_2m,
          humidity: d.current.relative_humidity_2m,
          wind: d.current.wind_speed_10m,
          max: d.daily.temperature_2m_max[0],
          min: d.daily.temperature_2m_min[0],
          sunrise: d.daily.sunrise[0],
          sunset: d.daily.sunset[0],
        }),
      )
      .catch(() => {})
    return () => ac.abort()
  }, [])

  if (!w) return null
  const t = (c: number) => Math.round(unit === 'C' ? c : (c * 9) / 5 + 32)
  return (
    <section className="section weather" aria-labelledby="weather-title">
      <div className="container">
        <div ref={ref} className="weather__card reveal">
          <div className="weather__main">
            <p className="sh__eyebrow">Plan your visit</p>
            <h2 id="weather-title">Varanasi weather today</h2>
            <p className="weather__temp" aria-live="polite">
              {t(w.temp)}°{unit}
              <small>
                H {t(w.max)}° · L {t(w.min)}°
              </small>
            </p>
            <div className="weather__toggle" role="group" aria-label="Temperature unit">
              {(['C', 'F'] as const).map((u) => (
                <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}>
                  °{u}
                </button>
              ))}
            </div>
          </div>
          <ul className="weather__facts">
            <li><Sunrise size={20} aria-hidden /> <span>Sunrise</span> <strong>{time(w.sunrise)}</strong></li>
            <li><Sunset size={20} aria-hidden /> <span>Sunset</span> <strong>{time(w.sunset)}</strong></li>
            <li><Droplets size={20} aria-hidden /> <span>Humidity</span> <strong>{Math.round(w.humidity)}%</strong></li>
            <li><Wind size={20} aria-hidden /> <span>Wind</span> <strong>{Math.round(w.wind)} km/h</strong></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
