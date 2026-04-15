import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const groups = [
  {
    label: 'Getting Started',
    items: [
      { value: 'overview', depth: 2, label: 'Overview' },
      { value: 'installation', depth: 2, label: 'Installation' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { value: 'configuration', depth: 2, label: 'Configuration' },
      { value: 'plugins', depth: 2, label: 'Plugins' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { value: 'api', depth: 2, label: 'API' },
      { value: 'changelog', depth: 2, label: 'Changelog' },
    ],
  },
]

const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })

const allItems = groups.flatMap((g) => g.items)

export const Grouped = () => (
  <Toc.Root className={styles.Root} items={allItems}>
    <Toc.Content className={styles.Content}>
      {allItems.map((item) => (
        <section key={item.value}>
          <h2 id={item.value}>{item.label}</h2>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>

    <Toc.Nav className={styles.Nav}>
      {groups.map((group) => (
        <div key={group.label} className={styles.Group}>
          <span className={styles.GroupLabel}>{group.label}</span>
          <Toc.List className={styles.List}>
            {group.items.map((item) => (
              <Toc.Item className={styles.Item} key={item.value} item={item}>
                <Toc.Link className={styles.Link} href={`#${item.value}`}>
                  {item.label}
                </Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </div>
      ))}
    </Toc.Nav>
  </Toc.Root>
)
