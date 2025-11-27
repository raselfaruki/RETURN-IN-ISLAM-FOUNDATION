import useTranslation from 'next-translate/useTranslation'

export default function Footer() {
  const { t } = useTranslation('common')
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>{t('footer.copy')}</p>
      </div>
    </footer>
  )
}