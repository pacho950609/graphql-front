import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavbarL } from '../components/navbar';
import { MatchProvider } from '../context/matchContext';


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
     <MatchProvider>
        <NavbarL/>
        <Component {...pageProps} />
     </MatchProvider>
    </>
  )
}

export default MyApp
