import { Toc } from '@ark-ui/react/toc'
import { useRef } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'nested-introduction', depth: 2, label: 'Introduction', lines: 10 },
  { value: 'nested-getting-started', depth: 2, label: 'Getting Started', lines: 12 },
  { value: 'nested-installation', depth: 3, label: 'Installation', lines: 8 },
  { value: 'nested-configuration', depth: 3, label: 'Configuration', lines: 18 },
  { value: 'nested-api-ref', depth: 2, label: 'API Reference', lines: 11 },
  { value: 'nested-hooks', depth: 3, label: 'Hooks', lines: 6 },
  { value: 'nested-components', depth: 3, label: 'Components', lines: 20 },
  { value: 'nested-code-examples', depth: 2, label: 'Examples', lines: 13 },
]

export const Nested = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root className={`${styles.Root}`} items={items} getScrollEl={() => contentRef.current}>
      <Toc.Content className={styles.Content} ref={contentRef}>
        {items.map((item) => {
          const Heading = item.depth === 2 ? 'h2' : 'h3'
          return (
            <section key={item.value}>
              <Heading id={item.value}>{item.label}</Heading>
              <div className={styles.DummyText}>
                {Array.from({ length: item.lines }).map((_, i) => (
                  <div key={i} className={styles.DummyLine} />
                ))}
              </div>
            </section>
          )
        })}
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={item.depth > 2 ? styles.ItemNested : styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link} href={`#${item.value}`}>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
