import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  weight: ["400", "500", "700"],
  display: 'swap',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${outfit.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </>
}
