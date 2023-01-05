import { Link } from '@/components/shared/Link'
import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Box, HStack, Stack } from '@/panda/jsx'
import { FaBookOpen, FaDiscord, FaGithub } from 'react-icons/fa'
import { PageLink } from './PageLink'

type SidebarItem = {
  name: string
  route: string
  isActive: boolean
}

type SidebarProps = {
  items: SidebarItem[]
}

const links = [
  {
    label: 'Documentation',
    href: 'https://ark-ui.com',
    icon: <FaBookOpen />,
    isActive: true,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/dQHfcWF',
    icon: <FaDiscord />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/chakra-ui/chakra-ui',
    icon: <FaGithub />,
  },
]

export const Sidebar = (props: SidebarProps) => (
  <Box
    as="aside"
    className={css({
      '--header-height': 'sizes.18',
    })}
    display={{ base: 'none', lg: 'block' }}
    position="sticky"
    top="var(--header-height)"
    minW="64"
    py="8"
    maxH="calc(100vh - var(--header-height))"
    overflowY="auto"
  >
    <Stack gap="12">
      <Stack
        as="ul"
        gap="4"
        textStyle="sm"
        fontWeight="medium"
        color="fg.muted"
        listStyle="none"
        ps="0"
      >
        {links.map((link) => (
          <li key={link.label}>
            <HStack
              as="a"
              gap="4"
              _currentPage={{ color: 'accent.default', fontWeight: 'semibold' }}
              aria-current={link.isActive ? 'page' : false}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                w="6"
                h="6"
                backgroundColor="bg.subtle"
                borderRadius="md"
                fontSize="md"
                borderWidth="1px"
              >
                {link.icon}
              </Box>
              <Text as="span">{link.label}</Text>
            </HStack>
          </li>
        ))}
      </Stack>
      <Stack gap="3">
        <Text fontSize="sm" lineHeight="1.5rem" fontWeight="semibold">
          Overview
        </Text>
        <Stack borderLeftWidth="1px" gap="2">
          {['Introduction', 'Getting started', 'Styling', 'Roadmap', 'Changelog'].map((item) => (
            <Link key={item} variant="sidebar">
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>
      <Stack gap="3" alignSelf="stretch">
        <Text textStyle="sm" lineHeight="1.5rem" fontWeight="semibold">
          Components
        </Text>
        <Stack borderLeftWidth="1px" alignSelf="stretch">
          {props.items.map((item, id) => (
            <PageLink
              key={id}
              href={item.route}
              variant="sidebar"
              aria-current={item.isActive ? 'page' : false}
            >
              {item.name}
            </PageLink>
          ))}
        </Stack>
      </Stack>
    </Stack>
  </Box>
)
