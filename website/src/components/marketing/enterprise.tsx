import { ArrowRight } from 'lucide-react'
import NextLink from 'next/link'
import { Box, Container, Stack } from 'styled-system/jsx'
import { Button, Heading, Text } from '~/components/ui'

export const Enterprise = () => {
  return (
    <Box bg="gray.2" borderYWidth="1px">
      <Container py={{ base: '16', md: '24' }} maxW="7xl">
        <Stack direction={{ base: 'column', lg: 'row' }} gap={{ base: '12', lg: '16' }}>
          <Stack gap={{ base: '8', md: '10' }} alignItems="start">
            <Stack gap={{ base: '4', md: '5' }} maxW="3xl">
              <Heading textStyle={{ base: '2xl', md: '3xl' }} fontWeight="semibold">
                Designed for product teams and organizations
              </Heading>
              <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }}>
                With support for a wide range of JS frameworks, you can create a design system that
                can be seamlessly integrated across multiple platforms and applications.
              </Text>
            </Stack>
            <Button size={{ base: 'lg', md: '2xl' }} variant="link" asChild>
              <NextLink href="/react/docs/overview/introduction">
                Get started <ArrowRight />
              </NextLink>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
