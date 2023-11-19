import '../styles/globals.css'
import { Navbar } from '../Components'
import { SwapTokenContextProvider } from '../Context/SwapContext'


const MyApp = ({ Component, pageProps }) => (
  <div>
  <SwapTokenContextProvider>
  <Navbar/>
  <Component {...pageProps} />
  </SwapTokenContextProvider>
  </div>
)

export default MyApp
