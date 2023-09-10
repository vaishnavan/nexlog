import Layout from '@/components/Layout/Layout'
import ThemeModeProvider from '@/context/themeProvider'
import '@/styles/globals.css'
import '@/styles/font.css'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as gtag from '../analytics/gtag'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    <ThemeProvider enableSystem={true} attribute='class'>
      <ThemeModeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeModeProvider>
    </ThemeProvider>
    </>
  )
}