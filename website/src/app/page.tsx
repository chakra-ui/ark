import { CodeExample } from '@/components/marketing/CodeExample'
import { Community } from '@/components/marketing/Community'
import { Creators } from '@/components/marketing/Creators'
import { Enterprise } from '@/components/marketing/Enterprise'
import { Footer } from '@/components/marketing/Footer'
import { Frameworks } from '@/components/marketing/Frameworks'
import { Hero } from '@/components/marketing/Hero'
import { Showcase } from '@/components/marketing/Showcase'
import { Testimonials } from '@/components/marketing/Testimonials'
import { Universe } from '@/components/marketing/Universe'
import { Navbar } from '@/components/navigation/navbar/Navbar'
import { Box } from '@/panda/jsx'

export default function Page() {
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
      <Showcase />
      <Frameworks />
      <CodeExample />
      <Enterprise />
      <Testimonials />
      <Universe />
      <Creators />
      <Community />
      <Footer />
    </Box>
  )
}

const Gradient = () => (
  <Box
    position="absolute"
    display={{ base: 'none', sm: 'block' }}
    inset="0"
    height="830px"
    background="radial-gradient(42.48% 42.48% at calc(50% + 100vw / 2) center, #EB5E41 0%, rgba(235, 94, 65, 0) 100%)"
    filter="blur(282px)"
  />
)
