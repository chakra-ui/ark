import { GitHubStats } from '@/components/navigation/navbar/GitHubStats'
import { IconButton } from '@/components/shared/IconButton'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Box, Container, HStack, Stack } from '@/panda/jsx'
import Link from 'next/link'
import { FiChevronRight, FiMenu } from 'react-icons/fi'
import { ColorModeButton } from './ColorModeButton'
import { Logo } from './Logo'

export const Navbar = () => (
  <nav
    role="navigation"
    className={css({
      position: 'sticky',
      top: '0',
      background: 'bg.canvas',
      zIndex: '100',
    })}
  >
    <Container>
      <HStack flex="1" minH={{ base: '16', md: '18' }}>
        <Link href="/" aria-label="Back home" className={css({ mr: 'auto' })}>
          <HStack color="fg.emphasized">
            <Logo />
            <Text textStyle="lg" fontWeight="semibold" whiteSpace="nowrap">
              Ark UI
            </Text>
          </HStack>
        </Link>
        <HStack gap={{ base: '1', lg: '12' }}>
          {/* @ts-expect-error Server Component */}
          <GitHubStats />
          <ColorModeButton />
        </HStack>
      </HStack>
    </Container>
    <hr />
    <Box borderBottomWidth="1px" display={{ base: 'block', lg: 'none' }}>
      <Container>
        <Stack direction="row" py="3" align="center">
          <IconButton icon={<FiMenu />} aria-label="Menu" variant="link" minW="unset" />
          <Text textStyle="sm" fontWeight="medium" color="fg.muted">
            Overview
          </Text>
          <Box color="fg.subtle">
            <FiChevronRight />
          </Box>
          <Text textStyle="sm" fontWeight="medium" color="accent.default">
            Introduction
          </Text>
        </Stack>
      </Container>
    </Box>
  </nav>
)
