import Link from 'next/link'

export default function ProductCard({ p }) {
  return (
    <div className="border rounded p-3">
      <Link href={`/shop/${p.slug}`}>
        <a>
          <div className="h-48 bg-gray-100 mb-3 flex items-center justify-center overflow-hidden">
            <img src={p.image_url} alt={p.title} className="object-cover h-full w-full" />
          </div>
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <div className="text-indigo-600 font-semibold mt-1">৳ {(p.price/100).toFixed(2)}</div>
        </a>
      </Link>
    </div>
  )
}