import { Link } from '@/components/shared/Link'
import { Text } from '@/components/shared/Text'
import { Box, HStack, Stack } from '@/panda/jsx'

type SidebarItem = {
  title: string
  url: string
  isActive: boolean
}

type SidebarProps = {
  items: SidebarItem[]
}

export const Sidebar = (props: SidebarProps) => {
  return (
    <Box
      as="aside"
      minW="256px"
      position="sticky"
      display={{ base: 'none', lg: 'block' }}
      top="92px"
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
          <li>
            <HStack as="a" gap="4" fontWeight="semibold" color="accent.default">
              <Box w="6" h="6" backgroundColor="bg.subtle" borderRadius="md" />
              Documentation
            </HStack>
          </li>
          {[, 'Discord', 'GitHub'].map((item) => (
            <li key={item}>
              <HStack as="a" gap="4">
                <Box w="6" h="6" backgroundColor="bg.subtle" borderRadius="md" />
                {item}
              </HStack>
            </li>
          ))}
        </Stack>
        <Stack gap="3">
          <Text fontSize="sm" lineHeight="1.5rem" fontWeight="semibold">
            Getting started
          </Text>
          <Stack borderLeftWidth="1px" gap="2">
            {['Welcome'].map((item) => (
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
              <Link
                key={id}
                href={item.url}
                variant="sidebar"
                aria-current={item.isActive ? 'page' : false}
              >
                {item.title}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
