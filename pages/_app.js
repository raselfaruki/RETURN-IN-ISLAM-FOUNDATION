import '../styles/globals.css'
import Layout from '../components/Layout'
import { CartProvider } from '../lib/cart'
import 'react-toastify/dist/ReactToastify.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}