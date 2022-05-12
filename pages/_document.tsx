import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta
            name='description'
            content='Pipsig is a smart and secure cryptocurrency exchange platform that enables users to trade Bitcoin, Ethereum, Binance Coin, and other cryptocurrencies, as well as a wide range of NFTs and other assets.'
          />
          <meta name='keywords' content='Pipsig Trading' />
          <link rel='icon' href='/logo.svg' />
          <link rel='shortcut icon' href='/logo.svg' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
