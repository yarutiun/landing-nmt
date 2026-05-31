import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ParabolaDemo from '@/components/ParabolaDemo'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import AISection from '@/components/AISection'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'
import AmplitudeInit from '@/components/AmplitudeInit'

export default function Home() {
  return (
    <>
      <AmplitudeInit />
      <Navbar />
      <main>
        <HeroSection />
        <ParabolaDemo />
        <FeaturesSection />
        <HowItWorks />
        <AISection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
