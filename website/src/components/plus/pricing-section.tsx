import { Container, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { PricingCard } from './pricing-card'

export const PricingSection = () => {
  return (
    <Container py="16" maxW="7xl" id="pricing">
      <Stack gap={{ base: '12', md: '16' }} alignItems="center">
        <Stack gap="4" textAlign="center" maxW="2xl">
          <Heading size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
            One-time payment, lifetime updates.
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            Unlock exclusive examples and support the development of Ark UI
          </Text>
        </Stack>

        <Stack direction={{ base: 'column', sm: 'row' }} gap="8" align="start" maxW="4xl">
          <PricingCard variant="personal" />
          <PricingCard variant="team" />
        </Stack>
      </Stack>
    </Container>
  )
}
