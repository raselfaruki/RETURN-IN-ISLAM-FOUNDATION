import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, locales, pathname, asPath, query } = router
  return (
    <div className="flex items-center space-x-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.push({ pathname, query }, asPath, { locale: l })}
          className={`px-2 py-1 rounded ${locale === l ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white'}`}
          aria-pressed={locale === l}
        >
          {l === 'bn' ? 'বাংলা' : 'EN'}
        </button>
      ))}
    </div>
  )
}