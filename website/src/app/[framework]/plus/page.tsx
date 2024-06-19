import type { Metadata } from 'next'
import { Container, Stack } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { Faqs } from '~/components/plus/faqs'
import { GetInTouch } from '~/components/plus/get-in-touch'
import { PricingCard } from '~/components/plus/pricing-card'
import { signIn } from '~/lib/auth'

export default function Page() {
  return (
    <Container py="12" maxW="7xl">
      <Stack gap={{ base: '16', md: '24' }} alignItems="center">
        <PageHeader
          heading="Ark UI Plus"
          subHeading="Pricing"
          description="Unlock exclusive examples and support the development of Ark UI"
        />
        <Stack direction={{ base: 'column', sm: 'row' }} gap="8" align="start" maxW="4xl">
          <PricingCard variant="personal" />
          <PricingCard variant="team" />
        </Stack>
        <Faqs />
        <GetInTouch />
      </Stack>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Ark UI Plus',
  description:
    'Discover amazing projects built with Ark UI. Share your own by opening an issue on our GitHub repository.',
}
