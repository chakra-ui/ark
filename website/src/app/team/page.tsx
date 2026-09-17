import { SiGithub, SiX } from '@icons-pack/react-simple-icons'
import { GlobeIcon } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Grid, HStack, Stack } from 'styled-system/jsx'
import { Navbar } from '~/components/marketing/navbar'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { type GitHubUser, fetchContributors, fetchGithubUsers } from '~/lib/github-utils'
import { teamMembers } from '~/lib/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Ark UI is built by a small core team and a large community of contributors.',
}

const avatar = css({ rounded: 'l2', flexShrink: '0', objectFit: 'cover' })

const toUrl = (value: string) => {
  try {
    return new URL(value).href
  } catch {
    return `https://${value}`
  }
}

const iconLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
  textStyle: 'xs',
  color: 'fg.muted',
  transitionProperty: 'color',
  transitionDuration: 'normal',
  whiteSpace: 'nowrap',
  _hover: { color: 'fg.default' },
})

const MemberCard = ({ user, role }: { user: GitHubUser; role: string }) => (
  <Box borderWidth="1px" borderColor="border.default" rounded="l3" p="4">
    <HStack gap="3" alignItems="flex-start">
      <img src={user.avatar_url} alt={user.login} width={48} height={48} className={avatar} />
      <Stack gap="1" minW="0">
        <Text fontWeight="semibold" color="fg.default" truncate>
          {user.name ?? user.login}
        </Text>
        <Text textStyle="sm" color="fg.muted">
          {role}
        </Text>
        <HStack gap="3" pt="1" flexWrap="wrap">
          <a className={iconLink} href={user.html_url} target="_blank" rel="noopener">
            <SiGithub size={13} />@{user.login}
          </a>
          {user.twitter_username && (
            <a className={iconLink} href={`https://x.com/${user.twitter_username}`} target="_blank" rel="noopener">
              <SiX size={13} />@{user.twitter_username}
            </a>
          )}
          {user.blog && (
            <a className={iconLink} href={toUrl(user.blog)} target="_blank" rel="noopener">
              <GlobeIcon size={13} />
              Website
            </a>
          )}
        </HStack>
      </Stack>
    </HStack>
  </Box>
)

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Stack gap="4">
    <Text textStyle="sm" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase" color="fg.subtle">
      {title}
    </Text>
    {children}
  </Stack>
)

export default async function TeamPage() {
  const logins = teamMembers.map((member) => member.login)
  const [users, contributors] = await Promise.all([fetchGithubUsers(logins), fetchContributors(logins)])

  const byLogin = (login: string) => users.find((user) => user.login.toLowerCase() === login.toLowerCase())
  const maintainers = teamMembers.filter((member) => member.status === 'maintainer')
  const advisors = teamMembers.filter((member) => member.status === 'advisor')

  const renderMembers = (members: typeof teamMembers) => (
    <Grid columns={{ base: 1, sm: 2, md: 3 }} gap="4">
      {members.map((member) => {
        const user = byLogin(member.login)
        return user ? <MemberCard key={member.login} user={user} role={member.role} /> : null
      })}
    </Grid>
  )

  return (
    <Box minH="100vh">
      <Navbar />
      <Container py={{ base: '16', md: '24' }} maxW="5xl">
        <Stack gap="12">
          <Stack gap="3">
            <Heading as="h1" size="4xl" fontWeight="bold">
              Meet the team
            </Heading>
            <Text color="fg.muted" size="xl">
              Ark UI is built by a small core team and a large community of contributors.
            </Text>
          </Stack>

          <Section title="Core">{renderMembers(maintainers)}</Section>
          {advisors.length > 0 && <Section title="Advisors">{renderMembers(advisors)}</Section>}

          {contributors.length > 0 && (
            <Section title={`Contributors · ${contributors.length}`}>
              <Flex wrap="wrap" gap="2">
                {contributors.map((person) => (
                  <a key={person.login} href={person.html_url} target="_blank" rel="noreferrer" title={person.login}>
                    <img src={person.avatar_url} alt={person.login} width={40} height={40} className={avatar} />
                  </a>
                ))}
              </Flex>
            </Section>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
