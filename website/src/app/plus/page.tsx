import type { Metadata } from 'next'
import { Box, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { ExamplesShowcase } from '~/components/plus/examples-showcase'
import { Faqs } from '~/components/plus/faqs'
import { GetInTouch } from '~/components/plus/get-in-touch'
import { PlusHero } from '~/components/plus/plus-hero'
import { PricingSection } from '~/components/plus/pricing-section'

export default function Page() {
  return (
    <Box minH="100%" position="relative" backgroundImage="url(/images/pattern.svg)" backgroundRepeat="repeat-x">
      <Box
        position="absolute"
        display={{ base: 'none', sm: 'block' }}
        inset="0"
        height="830px"
        background="radial-gradient(42.48% 42.48% at calc(50% + 100vw / 2) center, #EB5E41 0%, rgba(235, 94, 65, 0) 100%)"
        filter="blur(282px)"
      />
      <Stack gap={{ base: '16', md: '24' }} position="relative">
        <PlusHero />
        <ExamplesShowcase />
        <PricingSection />
        <Faqs />
        <GetInTouch />
      </Stack>
      <Footer />
    </Box>
  )
}

export const metadata: Metadata = {
  title: 'Ark Plus',
  description: 'Level up your design system with Ark Plus. Accelerate your usage of Ark UI with exclusive examples.',
}
