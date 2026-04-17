import { Toc, useToc } from '@ark-ui/react/toc'
import { useRef } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'affliation', depth: 2, label: 'Affiliation', lines: 12 },
  { value: 'impact', depth: 2, label: 'Impact', lines: 8 },
  { value: 'automation', depth: 2, label: 'Automation', lines: 10 },
  { value: 'faq', depth: 2, label: 'FAQ', lines: 12 },
  { value: 'application', depth: 2, label: 'Application', lines: 14 },
]

export const RootProvider = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const toc = useToc({ items, rootMargin: '0px 0px -80% 0px', getScrollEl: () => contentRef.current })

  return (
    <Toc.RootProvider className={`${styles.Root} ${styles.RootWithMobileNav}`} value={toc}>
      <div className={styles.MobileNav}>
        <output className={styles.ActiveOutput}>active: {JSON.stringify(toc.activeIds)}</output>

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
        <output className={styles.ActiveOutput}>active: {JSON.stringify(toc.activeIds)}</output>
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
