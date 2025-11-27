import { useState } from 'react'

export default function ProductCarousel({ images = [] }) {
  const [idx, setIdx] = useState(0)
  if (!images.length) return null
  return (
    <div>
      <div className="h-64 bg-gray-100 flex items-center justify-center mb-2">
        <img src={images[idx]} alt="product" className="object-contain h-full" />
      </div>
      <div className="flex space-x-2">
        {images.map((src,i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-16 h-16 border ${i===idx ? 'ring-2 ring-indigo-600' : ''}`}>
            <img src={src} alt="" className="object-cover h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  )
}