import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

export default function SignUp() {
  const { t } = useTranslation('common')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return alert(error.message)
    alert(t('auth.checkEmail'))
    router.push('/')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t('auth.signup')}</h1>
      <form onSubmit={handleSignup} className="space-y-3">
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2" />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? t('auth.processing') : t('auth.signup')}</button>
      </form>
    </div>
  )
}