import { Toc, useToc } from '@ark-ui/react/toc'
import { useRef } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const RootProvider = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const toc = useToc({ items, rootMargin: '0px 0px -80% 0px', getScrollEl: () => contentRef.current })

  return (
    <Toc.RootProvider className={`${styles.Root} ${styles.RootWithMobileNav}`} value={toc}>
      <div className={styles.MobileNav}>
        <select
          className={styles.NativeSelect}
          data-active={toc.activeIds.length > 0 || undefined}
          value={toc.activeIds[0] ?? items[0].value}
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

      <Toc.Content className={styles.Content} ref={contentRef}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value}>{item.label}</h2>
            <div className={styles.DummyText}>
              {Array.from({ length: item.lines }, (_, i) => (
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
    </Toc.RootProvider>
  )
}
