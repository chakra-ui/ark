import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const Basic = () => {
  let contentRef: HTMLElement | null = null

  return (
    <Toc.Root class={styles.Root} items={items} getScrollEl={() => contentRef}>
      <Toc.Content class={styles.Content} ref={(el) => (contentRef = el)}>
        {items.map((item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <div class={styles.DummyText}>
              {Array.from({ length: item.lines }).map(() => (
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
}
