import { Box } from 'styled-system/jsx'
import { Gradient } from '~/components/marketing/gradient'
import { Hero } from '~/components/marketing/hero'
import { Navbar } from '~/components/marketing/navbar'

export default function Home() {
  return (
    <Box
      minH="100%"
      position="relative"
      backgroundImage="url(/images/pattern.svg)"
      backgroundRepeat="repeat-x"
    >
      <Navbar />
      <Gradient />
      <Hero />
      {/* 
      <Showcase />
      <Frameworks />
      <CodeExample examples={examples} />
      <Enterprise />
      <Testimonials />
      <Universe />
      <Creators />
      <Community />
      <Footer /> */}
    </Box>
  )
}
