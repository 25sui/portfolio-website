import GalaxyHero from '@/components/GalaxyHero'
import Projects from '@/components/Projects'
import InProgress from '@/components/InProgress'
import StarRadio from '@/components/StarRadio'
import StarChain from '@/components/StarChain'
import UniverseComm from '@/components/UniverseComm'
import MirrorStar from '@/components/MirrorStar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1020]">
      <Header />
      <main>
        <GalaxyHero />
        <Projects />
        <InProgress />
        <StarRadio />
        <StarChain />
        <UniverseComm />
        <MirrorStar />
      </main>
      <Footer />
    </div>
  )
}
