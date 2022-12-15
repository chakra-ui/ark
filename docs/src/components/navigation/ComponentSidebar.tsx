import { panda, Stack } from '../../../panda/jsx'
import { Link } from '../shared/Link'
import { Text } from '../shared/Text'

interface ComponentSidebarItem {
  framework: string
  component: string
}

interface ComponentSidebarProps {
  items: ComponentSidebarItem[]
}

export const ComponentSidebar = (props: ComponentSidebarProps) => {
  return (
    <>
      <Text textStyle="sm" lineHeight="1.5rem" fontWeight="semibold">
        Components
      </Text>
      <Stack borderLeftWidth="1px" gap="2">
        <panda.ul listStyleType="none" p="0">
          {props.items.map((item) => (
            <panda.li
              key={`${item.framework}-${item.component}`}
              display="flex"
              alignItems="stretch"
            >
              <Link
                textStyle="sm"
                lineHeight="2rem"
                pl="4"
                color="fg.muted"
                borderLeftWidth="1px"
                _hover={{ color: 'gray.800', borderLeftColor: 'gray.400' }}
                ml="-1px"
                textTransform="capitalize"
                href={`/docs/${item.framework}/${item.component}`}
              >
                {item.component}
              </Link>
            </panda.li>
          ))}
        </panda.ul>
      </Stack>
    </>
  )
}
