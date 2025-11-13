import { recipe } from '../sidebar.recipe'
import { DocsSidebarGroup } from './docs-sidebar-group'
import type { Page } from '~/lib/source'

const styles = recipe()

interface Props {
  groups: Page[][]
}

export const DocsSidebar = (props: Props) => {
  const { groups } = props

  return (
    <nav>
      <ul className={styles.root}>
        {groups.map((group, id) => {
          const links = uniqueByTitle(group).map((item) => ({
            id: item.data.id,
            title: item.data.title,
            slug: item.slugs.join('/'),
            status: item.data.status,
          }))

          return <DocsSidebarGroup key={id} category={group[0].data.category} links={links} />
        })}
      </ul>
    </nav>
  )
}

const uniqueByTitle = (items: Page[]): Page[] =>
  Array.from(new Map(items.map((item) => [item.data.title, item])).values())
