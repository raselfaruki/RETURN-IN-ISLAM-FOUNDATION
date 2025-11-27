import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function DowaPage() {
  const { t, lang } = useTranslation('common')
  const [duas, setDuas] = useState([])

  useEffect(() => {
    async function fetchDuas() {
      const { data } = await supabase.from('duas').select('*').eq('locale', lang || 'bn')
      setDuas(data || [])
    }
    fetchDuas()
  }, [lang])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('nav.dua')}</h1>
      <div className="space-y-4">
        {duas.map(d => (
          <div key={d.id} className="border rounded p-3">
            <div className="font-semibold">{d.title}</div>
            <div className="text-right text-lg mt-2">{d.arabic}</div>
            <div className="mt-2 text-gray-700">{d.translation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}