import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { useRef } from 'react'

const items = [
  { value: 'step-validation', depth: 2, label: 'Validation Pending', lines: 5 },
  { value: 'upload-progress', depth: 2, label: 'Asset Uploading', lines: 90 },
  { value: 'deployment-sync', depth: 2, label: 'Server Sync Active', lines: 12 },
  { value: 'build-pipeline', depth: 2, label: 'CI/CD Running', lines: 105 },
  { value: 'database-health', depth: 2, label: 'DB Connection Stable', lines: 3 },
]

export const WithIndicator = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root className={styles.Root} items={items} getScrollEl={() => contentRef.current}>
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
          <Toc.Indicator className={styles.Indicator} />
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
