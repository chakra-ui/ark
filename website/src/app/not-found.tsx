import type { Metadata } from 'next'
import NextLink from 'next/link'
import { Box, Center, Stack, styled } from 'styled-system/jsx'
import { Button } from '~/components/ui/primitives/button'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'

export const metadata: Metadata = {
  title: '404 — this page went headless',
}

export default function NotFound() {
  return (
    <Box minH="100%" position="relative" backgroundImage="url(/images/pattern.svg)" backgroundRepeat="repeat-x">
      <Box
        position="absolute"
        display={{ base: 'none', sm: 'block' }}
        inset="0"
        height="830px"
        background="radial-gradient(42.48% 42.48% at calc(50% + 100vw / 2) center, #EB5E41 0%, rgba(235, 94, 65, 0) 100%)"
        filter="blur(282px)"
        pointerEvents="none"
      />
      <Navbar />
      <Center px="6" py={{ base: '24', md: '32' }}>
        <Stack gap="6" maxW="lg" textAlign="center" alignItems="center">
          <styled.p
            fontSize={{ base: '7xl', md: '9xl' }}
            fontWeight="bold"
            lineHeight="1"
            letterSpacing="tight"
            backgroundImage="linear-gradient(135deg, #EB5E41, #f0a58f)"
            backgroundClip="text"
            color="transparent"
          >
            404
          </styled.p>
          <Heading as="h1" textStyle={{ base: '2xl', md: '3xl' }}>
            This page went headless.
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            We render behavior, not this route. It's unstyled, unmounted, and honestly not in the anatomy.
          </Text>
          <Button asChild size="lg" mt="2">
            <NextLink href="/">Take me somewhere accessible</NextLink>
          </Button>
        </Stack>
      </Center>
      <Footer />
    </Box>
  )
}
