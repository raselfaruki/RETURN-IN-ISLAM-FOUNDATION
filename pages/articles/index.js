import useTranslation from 'next-translate/useTranslation'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Articles() {
  const { t, lang } = useTranslation('common')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('articles').select('*').eq('locale', lang || 'bn').order('created_at', { ascending: false })
      setArticles(data || [])
    }
    load()
  }, [lang])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('nav.articles')}</h1>
      <div className="space-y-4">
        {articles.map(a => (
          <div key={a.id} className="border p-3 rounded">
            <Link href={`/articles/${a.slug}`}><a className="font-semibold">{a.title}</a></Link>
            <p className="text-gray-700">{a.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}