import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../src/utils/theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/utils/createEmotionCache'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../src/redux/store'
import { Provider } from 'react-redux'

const clientSideEmotionCache = createEmotionCache()

interface RootProps extends AppProps {
  emotionCache?: EmotionCache
}

function Root({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: RootProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  )
}

export default Root
