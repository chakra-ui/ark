import { SiDiscord, SiGithub, SiX } from '@icons-pack/react-simple-icons'
import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Grid, HStack, Stack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { Logo } from '../logo'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Documentation', href: '/docs/react/overview/getting-started' },
      { label: 'Examples', href: '/examples/react/checkbox-group' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Toolkit',
    links: [
      { label: 'MCP Server', href: '/docs/react/ai/mcp-server' },
      { label: 'LLMs.txt', href: '/llms.txt', external: true },
      { label: 'Changelog', href: '/docs/react/overview/changelog' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: 'https://discord.gg/ww6HE5xaZ2', external: true },
      { label: 'GitHub', href: 'https://github.com/chakra-ui/ark', external: true },
      { label: 'X (Twitter)', href: 'https://twitter.com/ark_ui_', external: true },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Showcase', href: '/showcase' },
      { label: 'Team', href: '/team' },
      { label: 'Ark Plus', href: '/plus' },
    ],
  },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/chakra-ui/ark', icon: SiGithub },
  { label: 'Discord', href: 'https://discord.gg/ww6HE5xaZ2', icon: SiDiscord },
  { label: 'X (Twitter)', href: 'https://twitter.com/ark_ui_', icon: SiX },
]

const linkClass = css({
  color: 'fg.muted',
  textStyle: 'sm',
  transitionProperty: 'color',
  transitionDuration: 'normal',
  width: 'fit-content',
  _hover: { color: 'fg.default' },
})

const FooterLink = ({ link }: { link: FooterLink }) =>
  link.external ? (
    <a className={linkClass} href={link.href} target="_blank" rel="noopener">
      {link.label}
    </a>
  ) : (
    <NextLink className={linkClass} href={link.href}>
      {link.label}
    </NextLink>
  )

const BottomBar = ({ withBorder }: { withBorder?: boolean }) => (
  <Flex
    mt={withBorder ? { base: '10', md: '16' } : '0'}
    pt={withBorder ? '6' : '0'}
    borderTopWidth={withBorder ? '1px' : '0'}
    borderColor="border.subtle"
    justify="space-between"
    align="center"
    gap="4"
    direction={{ base: 'column', sm: 'row' }}
  >
    <Text color="fg.subtle" textStyle="sm">
      Copyright © {new Date().getFullYear()}
    </Text>
    <NextLink href="/team" className={linkClass}>
      Proudly made by the Chakra team
    </NextLink>
  </Flex>
)

export const Footer = ({ minimal = false }: { minimal?: boolean }) => {
  if (minimal) {
    return (
      <Box as="footer" borderTopWidth="1px" borderColor="border.subtle">
        <Container py="6">
          <BottomBar />
        </Container>
      </Box>
    )
  }

  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border.subtle">
      <Container py={{ base: '12', md: '16' }}>
        <Grid columns={{ base: 2, md: 6 }} gap={{ base: '8', md: '12' }}>
          <Stack gap="4" alignItems="flex-start" gridColumn={{ base: 'span 2', md: 'span 2' }}>
            <Logo />
            <Text color="fg.muted" textStyle="sm" maxW="16rem">
              The headless UI library for building reusable, scalable design systems.
            </Text>
            <HStack gap="4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={social.label}
                  className={css({ color: 'fg.subtle', _hover: { color: 'fg.default' } })}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </HStack>
          </Stack>
          {columns.map((column) => (
            <Stack key={column.title} gap="3">
              <Text
                textStyle="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                textTransform="uppercase"
                color="fg.subtle"
              >
                {column.title}
              </Text>
              <Stack gap="2.5">
                {column.links.map((link) => (
                  <FooterLink key={link.label} link={link} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>
        <BottomBar withBorder />
      </Container>
    </Box>
  )
}
