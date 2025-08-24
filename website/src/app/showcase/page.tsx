import { showcases } from '.velite'
import type { Metadata } from 'next'
import { Box, Container, Grid, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/navigation/navbar'
import { ShowcaseCard } from '~/components/showcase-card'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

export const metadata: Metadata = {
  title: 'Showcase - Ark UI',
  description:
    'See how our headless components power modern teams building exceptional digital experiences with Ark UI.',
  openGraph: {
    title: 'Showcase - Ark UI',
    description:
      'See how our headless components power modern teams building exceptional digital experiences with Ark UI.',
    url: 'https://ark-ui.com/showcase',
  },
}

export default function Page() {
  return (
    <Box minH="100vh" bg="bg.default">
      <Navbar />
      <Container pt={{ base: '32', md: '40' }} pb="20">
        <Stack gap={{ base: '12', md: '16' }}>
          <Stack>
            <Text textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.default">
              Showcase
            </Text>
            <Heading as="h1" fontWeight="bold" textStyle={{ base: '4xl', md: '5xl' }}>
              What's possible with Ark UI
            </Heading>
            <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.muted">
              See how our headless components power modern design systems and web applications
            </Text>
          </Stack>

          <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '4', md: '8' }}>
            {showcases.map((showcase) => (
              <ShowcaseCard key={showcase.url} data={showcase} />
            ))}
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </Box>
  )
}
