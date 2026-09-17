import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Grid, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Logo } from '~/components/logo'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'

const title = 'Brand kit'
const description = 'The Ark UI logo and palette. Please do not stretch, recolor, or restyle the logo.'

export const metadata: Metadata = { title, description }

const logos = [
  { name: 'Logo on brand', file: 'ark-logo-on-brand.svg', src: '/images/ark-logo-on-brand.svg', dark: false },
]

const colors = [
  { name: 'Coral', hex: '#EB5E41', role: 'Brand accent' },
  { name: 'Coral tint', hex: '#FFF8F7', role: 'Highlight surface' },
  { name: 'Ink', hex: '#111110', role: 'Dark ground' },
  { name: 'Paper', hex: '#FDFDFC', role: 'Light ground' },
]

const cell = css({ borderWidth: '1px', borderColor: 'border.default', mt: '-1px', ms: '-1px', overflow: 'hidden' })

export default function BrandPage() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="5xl" py={{ base: '16', md: '24' }}>
        <Stack gap="3">
          <Heading as="h1" size="4xl" fontWeight="bold">
            {title}
          </Heading>
          <Text size="lg" color="fg.muted" maxW="42rem">
            {description}
          </Text>
        </Stack>

        <Grid columns={{ base: 1, md: 2 }} mt="10">
          <Box className={cell}>
            <Flex align="center" justify="center" h="16rem" p="10" bg="bg.subtle">
              <Box color="colorPalette.default" css={{ '& svg': { height: '12' } }}>
                <Logo />
              </Box>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              gap="4"
              px="5"
              py="4"
              borderTopWidth="1px"
              borderColor="border.default"
            >
              <Text textStyle="sm" fontWeight="medium">
                Wordmark
              </Text>
            </Flex>
          </Box>
          {logos.map((logo) => (
            <Box key={logo.name} className={cell}>
              <Flex align="center" justify="center" h="16rem" p="10" bg="bg.subtle">
                <img
                  src={logo.src}
                  alt={`Ark UI ${logo.name.toLowerCase()}`}
                  className={css({ w: 'full', h: 'full', objectFit: 'contain' })}
                />
              </Flex>
              <Flex
                align="center"
                justify="space-between"
                gap="4"
                px="5"
                py="4"
                borderTopWidth="1px"
                borderColor="border.default"
              >
                <Text textStyle="sm" fontWeight="medium">
                  {logo.name}
                </Text>
                <a
                  href={logo.src}
                  download
                  className={css({
                    textStyle: 'sm',
                    fontFamily: 'mono',
                    color: 'fg.muted',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    _hover: { color: 'fg.default' },
                  })}
                >
                  {logo.file}
                </a>
              </Flex>
            </Box>
          ))}
        </Grid>

        <Heading as="h2" size="2xl" fontWeight="bold" mt="16" mb="6">
          Colors
        </Heading>
        <Grid columns={{ base: 2, sm: 4 }}>
          {colors.map((color) => (
            <Box key={color.name} className={cell}>
              <Box h="9rem" style={{ backgroundColor: color.hex }} />
              <Box px="5" py="4" borderTopWidth="1px" borderColor="border.default">
                <Text textStyle="sm" fontWeight="medium">
                  {color.name}
                </Text>
                <Text textStyle="sm" fontFamily="mono" color="fg.subtle">
                  {color.hex}
                </Text>
                <Text textStyle="sm" color="fg.subtle" mt="1.5">
                  {color.role}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>

        <Heading as="h2" size="2xl" fontWeight="bold" mt="16" mb="4">
          Using the name
        </Heading>
        <Text color="fg.muted" maxW="42rem">
          Write it <strong>Ark UI</strong> on first mention and <strong>Ark</strong> after that. The package scope is{' '}
          <code>@ark-ui</code>, lowercase. Do not write ArkUI, ark.ui, or Ark-UI.
        </Text>
      </Container>
      <Footer />
    </Box>
  )
}
