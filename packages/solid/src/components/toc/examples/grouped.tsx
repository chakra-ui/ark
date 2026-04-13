import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const groups = [
  {
    label: 'Getting Started',
    items: [
      { value: 'overview', depth: 2 },
      { value: 'installation', depth: 2 },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { value: 'configuration', depth: 2 },
      { value: 'plugins', depth: 2 },
    ],
  },
  {
    label: 'Reference',
    items: [
      { value: 'api', depth: 2 },
      { value: 'changelog', depth: 2 },
    ],
  },
]

const allItems = groups.flatMap((g) => g.items)

export default function Grouped() {
  return (
    <Toc.Root class={styles.Root} items={allItems}>
      <Toc.Content class={styles.Content}>
        <h2 id="overview">Overview</h2>
        <p>Ark UI is a headless component library for building scalable design systems.</p>
        <h2 id="installation">Installation</h2>
        <p>Install with your preferred package manager. No configuration needed to get started.</p>
        <h2 id="configuration">Configuration</h2>
        <p>Customize behavior through props. Most defaults work well out of the box.</p>
        <h2 id="plugins">Plugins</h2>
        <p>Extend functionality with plugins. Write your own or use community-contributed ones.</p>
        <h2 id="api">API</h2>
        <p>The full API reference covers all props, events, and methods on each component part.</p>
        <h2 id="changelog">Changelog</h2>
        <p>All notable changes are documented here following semantic versioning conventions.</p>
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        {groups.map((group) => (
          <div class={styles.Group}>
            <h3>{group.label}</h3>
            <Toc.List class={styles.List}>
              {group.items.map((item) => (
                <Toc.Item class={styles.Item} item={item}>
                  <Toc.Link class={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
                </Toc.Item>
              ))}
            </Toc.List>
          </div>
        ))}
      </Toc.Nav>
    </Toc.Root>
  )
}
