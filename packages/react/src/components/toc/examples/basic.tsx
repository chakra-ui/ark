import { Toc } from '@ark-ui/react/toc'
import { useRef } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'basic-introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'basic-getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'basic-installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'basic-usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'basic-conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const Basic = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root
      className={`${styles.Root} ${styles.RootWithMobileNav}`}
      items={items}
      getScrollEl={() => contentRef.current}
    >
      <Toc.Context>
        {({ activeItems }) => (
          <div className={styles.MobileNav}>
            <select
              className={styles.NativeSelect}
              data-active={activeItems.length > 0 || undefined}
              value={activeItems[0]?.value ?? items[0].value}
              onChange={(e) => {
                const el = contentRef.current?.querySelector(`#${e.target.value}`)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </Toc.Context>

      <Toc.Content className={styles.Content} ref={contentRef}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value}>{item.label}</h2>
            <div className={styles.DummyText}>
              {Array.from({ length: item.lines }).map((_, i) => (
                <div key={i} className={styles.DummyLine} />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
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
