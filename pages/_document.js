import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link name="theme-color" content='#fff' />
        <link rel='preload' href='/Merriweather/Merriweather-regular.ttf' as='font' type='font/ttf' crossOrigin='anonymous' data-next-font="size-adjust" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
