import Landing from '@/components/Landing'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import ContactButton from '@/components/ContactButton'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ParticleBackground from '@/components/ParticleBackground'
import LoadingScreen from '@/components/LoadingScreen'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import SectionDivider, { SectionSeparator } from '@/components/ui/SectionDivider'
import AnimatedIcon from '@/components/ui/AnimatedIcon'
import WhatsAppButton from '@/components/WhatsAppButton'
import ParticleNetwork from '@/components/ui/ParticleNetwork'
import MagneticCursor from '@/components/ui/MagneticCursor'
import FloatingActionButtons from '@/components/ui/FloatingActionButtons'
import BrandsSection from '@/components/BrandsSection'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <AnimatedBackground />
      <ParticleBackground />
      <ParticleNetwork />
      <MagneticCursor />
      <ScrollProgress />
      <FloatingActionButtons />
      <WhatsAppButton phoneNumber="+919876543210" position="bottom-right" />
      <main className="min-h-screen relative">
        <Landing />
        
        <SectionDivider variant="wave" />
        
        <Portfolio />
        
        <SectionSeparator 
          icon={<AnimatedIcon type="camera" className="w-8 h-8 text-orange-500" />}
        />
        
        <BrandsSection />
        
        <SectionDivider variant="beam" />
        
        <About />
        
        <SectionDivider variant="beam" />
        
        <Testimonials />
        
        <SectionDivider variant="wave" />
        
        <Contact />
        <ContactButton />
        <ScrollToTop />
      </main>
    </>
  )
}