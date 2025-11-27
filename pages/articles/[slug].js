import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function ArticleDetail() {
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  const { slug } = router.query
  const [article, setArticle] = useState(null)

  useEffect(() => {
    if (!slug) return
    async function load() {
      const { data } = await supabase.from('articles').select('*').eq('slug', slug).eq('locale', lang || 'bn').single()
      setArticle(data || null)
    }
    load()
  }, [slug, lang])

  if (!article) return <div>{t('articles.notFound')}</div>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  )
}