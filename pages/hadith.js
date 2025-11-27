import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function HadithPage() {
  const { t, lang } = useTranslation('common')
  const [hadiths, setHadiths] = useState([])

  useEffect(() => {
    async function fetchHadiths() {
      const { data } = await supabase.from('hadiths').select('*').eq('locale', lang || 'bn')
      setHadiths(data || [])
    }
    fetchHadiths()
  }, [lang])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('nav.hadith')}</h1>
      <div className="space-y-4">
        {hadiths.map(h => (
          <div key={h.id} className="border rounded p-3">
            <div className="font-semibold">{h.title}</div>
            <div className="mt-2 text-gray-700">{h.text}</div>
            <div className="mt-1 text-sm text-gray-500">{h.source}</div>
          </div>
        ))}
      </div>
    </div>
  )
}