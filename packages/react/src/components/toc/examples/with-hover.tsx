import { Swap } from '@ark-ui/react/swap'
import { Toc } from '@ark-ui/react/toc'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'analytics-dashboard', depth: 2, label: 'Real-time Analytics', lines: 55 },
  { value: 'cloud-storage', depth: 2, label: 'S3 Cloud Storage', lines: 14 },
  { value: 'automation-tools', depth: 2, label: 'Workflow Automation', lines: 32 },
  { value: 'crm-integration', depth: 2, label: 'Salesforce Sync', lines: 45 },
  { value: 'report-generator', depth: 2, label: 'Custom PDF Reports', lines: 20 },
]

export const WithHover = () => {
  const [hovered, setHovered] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Toc.Root className={`${styles.Root} ${styles.HoverRoot}`} items={items} getScrollEl={() => contentRef.current}>
      <Toc.Content className={styles.Content} ref={contentRef}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value} className={styles.Heading} data-depth={item.depth}>
              {item.label}
            </h2>
            <div className={styles.DummyText}>
              {Array.from({ length: item.lines }).map((_, i) => (
                <div key={i} className={styles.DummyLine} />
              ))}
            </div>
          </section>
        ))}
      </Toc.Content>
      <Toc.Nav
        className={styles.NavHover}
        data-expanded={hovered || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Swap.Root className={styles.HoverSwap} swap={hovered}>
          <Swap.Indicator type="off" className={styles.HoverSkeleton}>
            {items.map((item) => (
              <Toc.Item item={item} key={item.value} className={styles.SkeletonBar} />
            ))}
          </Swap.Indicator>
          <Swap.Indicator type="on" className={styles.HoverList}>
            {items.map((item) => (
              <Toc.Item key={item.value} item={item} className={styles.Item}>
                <Toc.Link className={styles.HoverLink} href={`#${item.value}`}>
                  {item.label}
                </Toc.Link>
              </Toc.Item>
            ))}
          </Swap.Indicator>
        </Swap.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
