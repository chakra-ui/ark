import { Toc } from '@ark-ui/solid/toc'
import { For } from 'solid-js'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 6, units: 'paragraphs' })

const items = [
  { value: 'executive-summary', depth: 2, label: 'Executive Summary' },
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'methodology', depth: 2, label: 'Methodology' },
  { value: 'findings', depth: 2, label: 'Findings' },
  { value: 'recommendations', depth: 2, label: 'Recommendations' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

export const Report = () => (
  <Toc.Root class={styles.ReportRoot} items={items}>
    <Toc.Nav class={styles.ReportNav}>
      <Toc.Title class={styles.Title}>Table of Contents</Toc.Title>
      <Toc.List class={styles.List}>
        <For each={items}>
          {(item, index) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.LinkNumbered}>
                <span class={styles.Number}>{String(index() + 1).padStart(2, '0')}</span>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          )}
        </For>
      </Toc.List>
    </Toc.Nav>

    <Toc.Content class={styles.ReportContent}>
      <For each={items}>
        {(item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <p>{p}</p>
          </section>
        )}
      </For>
    </Toc.Content>
  </Toc.Root>
)
