import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'overview', depth: 2, label: 'Overview' },
  { value: 'architecture', depth: 2, label: 'Architecture' },
  { value: 'state-machines', depth: 2, label: 'State Machines' },
  { value: 'components', depth: 2, label: 'Components' },
  { value: 'theming', depth: 2, label: 'Theming' },
  { value: 'accessibility', depth: 2, label: 'Accessibility' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 6, units: 'paragraphs' })

export const WithIndicator = () => (
  <Toc.Root id="toc-with-indicator" class={styles.Root} items={items}>
    <Toc.Content class={styles.Content}>
      {items.map((item) => (
        <section>
          <h2 id={item.value}>{item.label}</h2>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>

    <Toc.Nav class={styles.Nav}>
      <Toc.Title class={styles.Title}>On this page</Toc.Title>
      <Toc.List class={styles.List}>
        <Toc.Indicator class={styles.Indicator} />
        {items.map((item) => (
          <Toc.Item class={styles.Item} item={item}>
            <Toc.Link class={styles.Link} href={`#${item.value}`}>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
