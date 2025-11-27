import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Slider({ items = [], interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!items.length) return
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % items.length), interval)
    return () => clearInterval(timerRef.current)
  }, [items, interval])

  if (!items.length) return null

  return (
    <div className="relative overflow-hidden rounded shadow-sm">
      {items.map((it, i) => (
        <div
          key={i}
          className={`transition-opacity duration-700 absolute inset-0 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="h-64 md:h-80 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${it.image_url || '/default-slide.jpg'})` }}>
            <div className="bg-black/40 text-white p-6 rounded">
              <div className="text-2xl font-bold">{it.title}</div>
              {it.subtitle && <div className="mt-2">{it.subtitle}</div>}
              {it.link && <Link href={it.link}><a className="inline-block mt-3 bg-white text-indigo-600 px-3 py-1 rounded">Read</a></Link>}
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  )
}