import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Showcase } from './components/Showcase/Showcase'
import { ShaderBanner } from './components/ShaderBanner/ShaderBanner'
import { Footer } from './components/Footer/Footer'

/** The page, top to bottom, in the same order as the Figma frame. */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <ShaderBanner />
      </main>
      <Footer />
    </>
  )
}
