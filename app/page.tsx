import Head from 'next/head'
import Image from 'next/image'
import DarkModeToggle from './components/DarkModeToggle'
Head

export default function Home() {
  return (
    <>
      <Head>
        <title>Eduling</title>
      </Head>
      <div>
        Home page
        <DarkModeToggle />
      </div>
    </>
  )
}
