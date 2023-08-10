import { Box } from 'styled-system/jsx'
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
      {/* 
      <Gradient />
      <Hero />
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
