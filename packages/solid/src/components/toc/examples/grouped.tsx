import { Toc } from '@ark-ui/solid/toc'
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

const paragraphs = loremIpsum({ count: 5, units: 'paragraphs' })

const allItems = groups.flatMap((g) => g.items)

export const Grouped = () => (
  <Toc.Root id="toc-grouped" class={styles.Root} items={allItems}>
    <Toc.Content class={styles.Content}>
      {allItems.map((item) => (
        <section>
          <h2 id={item.value}>{item.label}</h2>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>

    <Toc.Nav class={styles.Nav}>
      {groups.map((group) => (
        <div class={styles.Group}>
          <span class={styles.GroupLabel}>{group.label}</span>
          <Toc.List class={styles.List}>
            {group.items.map((item) => (
              <Toc.Item class={styles.Item} item={item}>
                <Toc.Link class={styles.Link} href={`#${item.value}`}>
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
