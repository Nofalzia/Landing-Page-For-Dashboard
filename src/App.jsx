import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UseCasesSection from './components/UseCasesSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import AnomalySection from './components/AnomalySection'
import ArchitectureSection from './components/ArchitectureSection'
import TeamSection from './components/TeamSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import MobileCTABar from './components/MobileCTABar'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <UseCasesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AnomalySection />
        <ArchitectureSection />
        <TeamSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  )
}
