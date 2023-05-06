import { Link } from '@/components/shared/Link'
import { Box, HStack, panda } from '@/panda/jsx'
import { FaBookOpen, FaDiscord, FaGithub } from 'react-icons/fa'
import { RiRoadMapFill } from 'react-icons/ri'

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
    href: 'https://github.com/chakra-ui/ark/',
    icon: <FaGithub />,
  },
  {
    label: 'Roadmap',
    href: 'https://ark-ui.canny.io/',
    icon: <RiRoadMapFill />,
  },
]

export const SidebarExternalLinks = () => (
  <panda.ul
    display="flex"
    flexDirection="column"
    gap={{ base: '5', lg: '4' }}
    textStyle={{ base: 'md', lg: 'sm' }}
    fontWeight="medium"
    color="fg.muted"
    listStyle="none"
    ps="0"
  >
    {links.map((link) => (
      <li key={link.label}>
        <Link
          color="inherit"
          _currentPage={{ color: 'accent.muted', fontWeight: 'semibold' }}
          aria-current={link.isActive ? 'page' : false}
          href={link.href}
          target="_blank"
          _hover={{
            color: 'fg.default',
          }}
        >
          <HStack gap="3">
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
            <panda.span>{link.label}</panda.span>
          </HStack>
        </Link>
      </li>
    ))}
  </panda.ul>
)
