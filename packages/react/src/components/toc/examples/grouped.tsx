import { Toc } from '@ark-ui/react/toc'
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

export const Grouped = () => (
  <Toc.Root className={styles.Root} items={allItems}>
    <Toc.Content className={styles.Content}>
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

    <Toc.Nav className={styles.Nav}>
      <Toc.Indicator className={styles.Indicator} />
      {groups.map((group) => (
        <div key={group.label} className={styles.Group}>
          <span className={styles.GroupLabel}>{group.label}</span>
          <Toc.List className={styles.List}>
            {group.items.map((item) => (
              <Toc.Item className={styles.Item} key={item.value} item={item}>
                <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </div>
      ))}
    </Toc.Nav>
  </Toc.Root>
)
