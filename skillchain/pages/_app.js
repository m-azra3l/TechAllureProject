import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SkillChain</title>
        <meta name="description" content="Blockchain skill verification decentralized application" />
        <meta name="author" content="Tech Allure"/>
        <meta name="color-scheme" content="dark"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>        
        <Component {...pageProps} />
        <footer>
          <h6>Made with ♥ by Tech Allure</h6>
        </footer>
      </body>
    </>
  )
}
