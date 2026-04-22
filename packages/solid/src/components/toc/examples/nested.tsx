import { Toc } from '@ark-ui/solid/toc'
import { Dynamic } from 'solid-js/web'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 10 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 12 },
  { value: 'installation', depth: 3, label: 'Installation', lines: 8 },
  { value: 'configuration', depth: 3, label: 'Configuration', lines: 14 },
  { value: 'api-reference', depth: 2, label: 'API Reference', lines: 10 },
  { value: 'hooks', depth: 3, label: 'Hooks', lines: 8 },
  { value: 'components', depth: 3, label: 'Components', lines: 12 },
  { value: 'examples', depth: 2, label: 'Examples', lines: 10 },
]

export const Nested = () => {
  let contentRef: HTMLElement | null = null

  return (
    <Toc.Root class={styles.Root} items={items} getScrollEl={() => contentRef}>
      <Toc.Content class={styles.Content} ref={(el) => (contentRef = el)}>
        {items.map((item) => (
          <section>
            <Dynamic component={item.depth === 2 ? 'h2' : 'h3'} id={item.value}>
              {item.label}
            </Dynamic>
            <div class={styles.DummyText}>
              {[...Array(item.lines)].map(() => (
                <div class={styles.DummyLine} />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={item.depth > 2 ? styles.ItemNested : styles.Item} item={item}>
              <Toc.Link class={styles.Link} href={`#${item.value}`}>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
