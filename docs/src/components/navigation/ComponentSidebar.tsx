import { panda, Stack } from '../../../panda/jsx'
import { Link } from '../shared/Link'
import { Text } from '../shared/Text'

interface ComponentSidebarItem {
  framework: string
  component: string
}

interface ComponentSidebarProps {
  items: ComponentSidebarItem[]
  framework: string
  component: string
}

export const ComponentSidebar = (props: ComponentSidebarProps) => {
  const { items, framework, component } = props
  return (
    <>
      <Text textStyle="sm" lineHeight="1.5rem" fontWeight="semibold">
        Components
      </Text>
      <Stack borderLeftWidth="1px" gap="2">
        <panda.ul listStyleType="none" p="0">
          {items.map((item) => {
            let absoluteHref = `/docs/${item.framework}/${item.component}`
            let isCurrentPage = component === item.component && framework === item.framework
            return (
              <panda.li
                key={`${item.framework}-${item.component}`}
                display="flex"
                alignItems="stretch"
              >
                <Link
                  aria-current={isCurrentPage ? 'page' : undefined}
                  href={absoluteHref}
                  variant="sidebar"
                  textTransform="capitalize"
                >
                  {item.component}
                </Link>
              </panda.li>
            )
          })}
        </panda.ul>
      </Stack>
    </>
  )
}
