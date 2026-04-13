import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'executive-summary', depth: 2, label: 'Executive Summary' },
  { value: 'methodology', depth: 2, label: 'Methodology' },
  { value: 'findings', depth: 2, label: 'Findings' },
  { value: 'recommendations', depth: 2, label: 'Recommendations' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

export default function WithNumbers() {
  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        {items.map((item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <p>Section content for {item.label}.</p>
          </section>
        ))}
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>Contents</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item, index) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.LinkNumbered}>
                <span class={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
