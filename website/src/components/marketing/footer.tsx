import { Container, Stack } from 'styled-system/jsx'
import { Text } from '~/components/ui'
import { Logo } from '../logo'

const resources = [
  {
    name: 'Docs',
    href: '/docs/react/overview/getting-started',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/chakra-ui/ark',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/ark_ui_',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/ww6HE5xaZ2',
  },
]

export const Footer = () => {
  return (
    <footer role="contentinfo">
      <Container py="8" maxW="8xl">
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          gap="8"
        >
          <Stack gap="1" align="start">
            <Logo />
            <Text color="fg.muted">A project by Chakra Systems</Text>
          </Stack>
          <Stack direction="row" gap="8">
            {resources.map((resource) => (
              <a key={resource.name} href={resource.href} target="_blank" rel="noreferrer">
                {resource.name}
              </a>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  )
}
