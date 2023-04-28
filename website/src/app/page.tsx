import { CodeExample } from '@/components/marketing/CodeExample'
import { Community } from '@/components/marketing/Community'
import { Creators } from '@/components/marketing/Creators'
import { Enterprise } from '@/components/marketing/Enterprise'
import { Footer } from '@/components/marketing/Footer'
import { Frameworks } from '@/components/marketing/Frameworks'
import { Gradient } from '@/components/marketing/Gradient'
import { Hero } from '@/components/marketing/Hero'
import { Showcase } from '@/components/marketing/Showcase'
import { Testimonials } from '@/components/marketing/Testimonials'
import { Universe } from '@/components/marketing/Universe'
import { Navbar } from '@/components/navigation/navbar/Navbar'
import { getCodeExamples } from '@/lib/getCodeExamples'
import { Box } from '@/panda/jsx'

export default async function Page() {
  const examples = await getCodeExamples()

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
      <CodeExample examples={examples} />
      <Enterprise />
      <Testimonials />
      <Universe />
      <Creators />
      <Community />
      <Footer />
    </Box>
  )
}
