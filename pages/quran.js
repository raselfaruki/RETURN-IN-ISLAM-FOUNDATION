import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Slider from '../components/Slider'

export default function QuranPage() {
  const { t, lang } = useTranslation('common')
  const [verses, setVerses] = useState([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('quran_verses').select('*').eq('locale', lang || 'bn').limit(20)
      setVerses(data || [])
    }
    load()
  }, [lang])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('nav.quran')}</h1>
      <Slider items={verses.map(v => ({ title: `S${v.surah}:A${v.ayah}`, subtitle: v.translation, image_url: '' }))} />
      <div className="mt-6 space-y-4">
        {verses.map(v => (
          <div key={v.id} className="border rounded p-3">
            <div className="text-xl font-semibold">{`S${v.surah}:A${v.ayah}`}</div>
            <div className="text-right text-2xl leading-relaxed">{v.arabic}</div>
            <div className="text-gray-700 mt-2">{v.translation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}