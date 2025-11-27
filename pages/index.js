import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const { t, lang } = useTranslation('common')
  const [slides, setSlides] = useState([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('slider_items').select('*').eq('locale', lang || 'bn').order('created_at', { ascending: true })
      setSlides(data || [])
    }
    load()
  }, [lang])

  return (
    <div>
      <Slider items={slides} />
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">{t('home.welcome')}</h1>
        <p className="text-lg text-gray-700 mb-6">{t('home.tagline')}</p>
      </section>
    </div>
  )
}