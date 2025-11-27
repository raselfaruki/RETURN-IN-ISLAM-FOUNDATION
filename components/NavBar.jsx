import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function NavBar() {
  const { t } = useTranslation('common')
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="font-semibold text-lg">{t('siteTitle')}</a>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/"><a className="hover:underline">{t('nav.home')}</a></Link>
          <Link href="/articles"><a className="hover:underline">{t('nav.articles')}</a></Link>
          <Link href="/shop"><a className="hover:underline">{t('nav.shop')}</a></Link>
          <Link href="/prayer-times"><a className="hover:underline">{t('nav.prayerTimes')}</a></Link>
          <Link href="/donate"><a className="hover:underline">{t('nav.donate')}</a></Link>
          <Link href="/quran"><a className="hover:underline">{t('nav.quran')}</a></Link>
          <Link href="/dowa"><a className="hover:underline">{t('nav.dua')}</a></Link>
          <Link href="/hadith"><a className="hover:underline">{t('nav.hadith')}</a></Link>
          <Link href="/cart"><a className="hover:underline">{t('nav.cart')}</a></Link>
          <LanguageSwitcher />
          {user ? <Link href="/admin"><a className="ml-2 bg-white text-indigo-600 px-2 py-1 rounded">{t('nav.admin')}</a></Link> :
            <Link href="/auth/login"><a className="ml-2 bg-white text-indigo-600 px-2 py-1 rounded">{t('auth.login')}</a></Link>}
        </div>
      </div>
    </nav>
  )
}