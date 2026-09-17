import { SiGithub, SiX } from '@icons-pack/react-simple-icons'
import { GlobeIcon } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { Footer } from '~/components/marketing/footer'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { type GitHubUser, fetchContributors, fetchGithubUsers } from '~/lib/github-utils'
import { teamMembers } from '~/lib/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Ark UI is built by a small core team and a large community of contributors.',
}

const toUrl = (value: string) => {
  try {
    return new URL(value).href
  } catch {
    return `https://${value}`
  }
}

const eyebrow = css({
  textStyle: 'sm',
  fontWeight: 'semibold',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'fg.subtle',
})

const socialButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '8',
  height: '8',
  rounded: 'md',
  color: 'fg.subtle',
  transitionProperty: 'color, background',
  transitionDuration: 'normal',
  _hover: { color: 'fg.default', bg: 'bg.muted' },
})

const MemberRow = ({ user, role, name }: { user: GitHubUser; role: string; name?: string }) => (
  <Box
    display="grid"
    gridTemplateColumns={{ base: 'auto 1fr', md: 'auto 1fr auto' }}
    alignItems="center"
    gap={{ base: '4', md: '6' }}
    py="5"
    borderTopWidth="1px"
    borderColor="border.default"
  >
    <img
      src={user.avatar_url}
      alt={name ?? user.name ?? user.login}
      width={48}
      height={48}
      className={css({ rounded: 'full', width: '12', height: '12', objectFit: 'cover' })}
    />
    <Box minW="0">
      <Text textStyle="lg" fontWeight="semibold" color="fg.default">
        {name ?? user.name ?? user.login}
      </Text>
      <Text textStyle="sm" color="fg.subtle" mt="1">
        {role}
      </Text>
    </Box>
    <Flex gap="1" gridColumn={{ base: '2', md: 'auto' }}>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener"
        aria-label={`${user.login} on GitHub`}
        className={socialButton}
      >
        <SiGithub size={16} />
      </a>
      {user.twitter_username && (
        <a
          href={`https://x.com/${user.twitter_username}`}
          target="_blank"
          rel="noopener"
          aria-label={`${user.login} on X`}
          className={socialButton}
        >
          <SiX size={16} />
        </a>
      )}
      {user.blog && (
        <a
          href={toUrl(user.blog)}
          target="_blank"
          rel="noopener"
          aria-label={`${user.login} website`}
          className={socialButton}
        >
          <GlobeIcon size={16} />
        </a>
      )}
    </Flex>
  </Box>
)

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box>
    <Text className={eyebrow} mb="2">
      {title}
    </Text>
    <Box borderBottomWidth="1px" borderColor="border.default">
      {children}
    </Box>
  </Box>
)

export default async function TeamPage() {
  const logins = teamMembers.map((member) => member.login)
  const [users, contributors] = await Promise.all([fetchGithubUsers(logins), fetchContributors(logins)])

  const byLogin = (login: string) => users.find((user) => user.login.toLowerCase() === login.toLowerCase())
  const maintainers = teamMembers.filter((member) => member.status === 'maintainer')
  const advisors = teamMembers.filter((member) => member.status === 'advisor')

  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="4xl" py={{ base: '16', md: '24' }}>
        <Stack gap="12">
          <Stack gap="3">
            <Heading as="h1" size="4xl" fontWeight="bold">
              Meet the team
            </Heading>
            <Text color="fg.muted" size="xl">
              Ark UI is built by a small core team and a large community of contributors.
            </Text>
          </Stack>

          <Section title="Core">
            {maintainers.map((member) => {
              const user = byLogin(member.login)
              return user ? <MemberRow key={member.login} user={user} role={member.role} name={member.name} /> : null
            })}
          </Section>
          {advisors.length > 0 && (
            <Section title="Advisors">
              {advisors.map((member) => {
                const user = byLogin(member.login)
                return user ? <MemberRow key={member.login} user={user} role={member.role} name={member.name} /> : null
              })}
            </Section>
          )}

          {contributors.length > 0 && (
            <Box>
              <Text className={eyebrow} mb="4">
                Contributors · {contributors.length}
              </Text>
              <Flex wrap="wrap" gap="2">
                {contributors.map((person) => (
                  <a key={person.login} href={person.html_url} target="_blank" rel="noopener" title={person.login}>
                    <img
                      src={person.avatar_url}
                      alt={person.login}
                      width={40}
                      height={40}
                      className={css({ rounded: 'full', bg: 'bg.muted', objectFit: 'cover' })}
                    />
                  </a>
                ))}
              </Flex>
            </Box>
          )}
        </Stack>
      </Container>
      <Footer />
    </Box>
  )
}
