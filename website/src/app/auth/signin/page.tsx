import NextLink from 'next/link'
import { Box, Center, Container, Divider, HStack, Stack } from 'styled-system/jsx'
import { EmailSignInForm } from '~/components/auth/email-signin-form'
import { OAuthSignInButtons } from '~/components/auth/oauth-signin-buttons'
import { Logo } from '~/components/logo'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

interface Props {
  searchParams: Promise<{ callbackURL?: string }>
}

export default async function Page(props: Props) {
  const { callbackURL = '/' } = await props.searchParams

  return (
    <Container display="flex" flex="1" alignItems="center" maxW="27rem">
      <Card.Root boxShadow="xl" flex="1">
        <Card.Header>
          <Stack gap="6">
            <Center>
              <NextLink href="/" aria-label="Back home">
                <Logo />
              </NextLink>
            </Center>
            <Box>
              <Card.Title>Sign In</Card.Title>
              <Card.Description>Use your email address or social account to sign in.</Card.Description>
            </Box>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Stack gap="6">
            <EmailSignInForm callbackURL={callbackURL} />
            <HStack>
              <Divider borderBottomWidth="1px" h="1px" />
              <Text textStyle="sm" color="fg.muted">
                OR
              </Text>
              <Divider borderBottomWidth="1px" h="1px" />
            </HStack>
            <OAuthSignInButtons callbackURL={callbackURL} />
          </Stack>
        </Card.Body>
      </Card.Root>
    </Container>
  )
}
