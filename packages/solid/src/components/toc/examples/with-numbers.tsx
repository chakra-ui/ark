import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'executive-summary', depth: 2, label: 'Executive Summary' },
  { value: 'methodology', depth: 2, label: 'Methodology' },
  { value: 'findings', depth: 2, label: 'Findings' },
  { value: 'recommendations', depth: 2, label: 'Recommendations' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 5, units: 'paragraphs' })

export const WithNumbers = () => (
  <Toc.Root id="toc-with-numbers" class={styles.Root} items={items}>
    <Toc.Content class={styles.Content}>
      {items.map((item) => (
        <section>
          <h2 id={item.value}>{item.label}</h2>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>
    <Toc.Nav class={styles.Nav}>
      <Toc.Title class={styles.Title}>Contents</Toc.Title>
      <Toc.List class={styles.List}>
        {items.map((item, index) => (
          <Toc.Item class={styles.Item} item={item}>
            <Toc.Link class={styles.LinkNumbered} href={`#${item.value}`}>
              <span class={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
