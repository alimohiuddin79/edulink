import Head from 'next/head'
import Image from 'next/image'
import DarkModeToggle from './components/DarkModeToggle'
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import AboutSection from './components/sections/AboutSection'
import CounselorSection from './components/sections/CounselorSection'
import ResumeSection from './components/sections/ResumeSection'
import QuestionnaireSection from './components/sections/QuestionnaireSection'

export default function Home() {
  return (
    <>
      <Head>
        {/* TODO: Import all meta tags later */}
        {/* <meta /> */}
        <title>Eduling</title>
      </Head>

      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CounselorSection />
      <ResumeSection />
      <QuestionnaireSection />
    </>
  )
}
