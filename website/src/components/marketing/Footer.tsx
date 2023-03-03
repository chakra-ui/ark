import { Container, Stack } from '@/panda/jsx'

import { Logo } from '../navigation/navbar/Logo'
import { Link } from '../shared/Link'
import { Text } from '../shared/Text'

export const Footer = () => {
  const links = [
    {
      label: 'Docs',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      label: 'GitHub',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      label: 'Twitter',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      label: 'Discord',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
  ]
  return (
    <footer role="contentinfo">
      <Container py="12">
        <Stack direction={{ base: 'column-reverse', md: 'row' }} justify="space-between" gap="8">
          <Stack gap={{ base: '1', md: '6' }} direction={{ base: 'column', md: 'row' }}>
            <Logo height="24px" />
            <Text color="fg.muted">A project by Chakra Inc.</Text>
          </Stack>
          <Stack direction="row" gap="8">
            {links.map((link, id) => (
              <Link key={id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  )
}
