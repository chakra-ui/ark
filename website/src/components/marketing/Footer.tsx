import { Container, Stack } from '@/panda/jsx'
import { Logo } from '../navigation/navbar/Logo'
import { Button } from '../shared/Button'
import { Text } from '../shared/Text'

export const Footer = () => {
  const resources = [
    {
      name: 'Docs',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      name: 'GitHub',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      name: 'Twitter',
      href: 'https://chakra-ui.com/docs/getting-started',
    },
    {
      name: 'Discord',
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
            {resources.map((resource, id) => (
              <Button key={id} href={resource.href} variant="link">
                {resource.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  )
}
