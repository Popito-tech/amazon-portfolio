import RootLayout from '@/components/rootComponents/Rootlayout'
import { persistor, store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SessionProvider session={session}>
            <div className='bg-gray-100'>
              <RootLayout>
                <Component {...pageProps} />
              </RootLayout>
            </div>
          </SessionProvider>
        </PersistGate>
      </Provider>
  )
}
