import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavbarL } from '../components/navbar';


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <NavbarL/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
