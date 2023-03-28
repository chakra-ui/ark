import { Container, Stack } from '@/panda/jsx'
import { Logo } from '../navigation/navbar/Logo'
import { Button } from '../shared/Button'
import { Text } from '../shared/Text'

export const Footer = () => {
  const resources = [
    {
      name: 'Docs',
      href: 'https://ark-ui.com/docs/getting-started',
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
      href: '#',
    },
  ]
  return (
    <footer role="contentinfo">
      <Container py="12">
        <Stack direction={{ base: 'column-reverse', md: 'row' }} justify="space-between" gap="8">
          <Stack gap={{ base: '1', md: '6' }} direction={{ base: 'column', md: 'row' }}>
            <Logo height="24px" />
            <Text color="fg.muted">A project by Chakra Systems</Text>
          </Stack>
          <Stack direction="row" gap="8">
            {resources.map((resource, id) => (
              <Button key={id} href={resource.href} variant="link" target="_blank">
                {resource.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  )
}
