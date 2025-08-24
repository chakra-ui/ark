import { ArrowRightIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Box, Container, HStack, Stack, styled } from 'styled-system/jsx'
import { hstack } from 'styled-system/patterns'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { getPublicUrl } from '~/lib/public-url'
import { ReactIcon, SolidIcon, SvelteIcon, VueIcon } from '../marketing/icons'

const ExistingCustomerBadge = () => {
  return (
    <Badge size="lg" variant="outline" alignSelf="flex-start">
      Existing Customer?{' '}
      <NextLink
        href={{
          pathname: '/auth/signin',
          query: { callbackUrl: `${getPublicUrl()}/examples` },
        }}
        className={hstack({
          gap: '1',
          color: 'colorPalette.default',
        })}
      >
        Sign in <ArrowRightIcon />
      </NextLink>
    </Badge>
  )
}

export const PlusHero = () => {
  return (
    <Box
      backgroundImage={{ base: 'none', md: 'url(/images/hero.svg)' }}
      _dark={{
        backgroundImage: { base: 'none', md: 'url(/images/hero_dark.svg)' },
      }}
      backgroundPosition="calc(50% + 250px) 25px"
      backgroundRepeat="no-repeat"
    >
      <Container pt={{ base: '16', md: '32' }} pb="8">
        <Stack gap={{ base: '6', md: '8' }} maxW="3xl">
          <Stack gap={{ base: '5', md: '6' }}>
            <Stack gap={{ base: '3', md: '4' }}>
              <ExistingCustomerBadge />
              <Heading as="h1" fontWeight="bold" textStyle={{ base: '4xl', md: '6xl' }}>
                Level up your <styled.span color="colorPalette.default">design system</styled.span> with{' '}
                <styled.span color="colorPalette.default">Ark Plus</styled.span>
              </Heading>
            </Stack>
            <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
              Accelerate your usage of Ark UI with exclusive examples designed to build production-ready components
              faster.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button asChild size={{ base: 'xl', md: '2xl' }}>
              <NextLink href="/examples">Browse Examples</NextLink>
            </Button>
            <Button asChild size={{ base: 'xl', md: '2xl' }} variant="outline">
              <NextLink href="#pricing">Buy Now</NextLink>
            </Button>
          </Stack>
          <HStack gap={{ base: '4', md: '8' }}>
            <HStack gap={{ base: '1', md: '2' }}>
              <ReactIcon />
              <Text color="fg.muted">React</Text>
            </HStack>
            <HStack gap={{ base: '1', md: '2' }}>
              <SolidIcon />
              <Text color="fg.muted">Solid</Text>
            </HStack>
            <HStack gap={{ base: '1', md: '2' }}>
              <VueIcon />
              <Text color="fg.muted">Vue</Text>
            </HStack>
            <HStack gap={{ base: '1', md: '2' }}>
              <SvelteIcon />
              <Text color="fg.muted">Svelte</Text>
            </HStack>
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
