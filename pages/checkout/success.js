import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export default function Success() {
  const { t } = useTranslation('common')
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{t('checkout.success')}</h1>
      <p className="mt-4">{t('checkout.thanks')}</p>
      <Link href="/"><a className="mt-4 inline-block text-indigo-600">{t('nav.home')}</a></Link>
    </div>
  )
}