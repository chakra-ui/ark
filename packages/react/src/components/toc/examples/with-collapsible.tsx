import { Collapsible } from '@ark-ui/react/collapsible'
import { Toc } from '@ark-ui/react/toc'
import { ChevronRightIcon } from 'lucide-react'
import CollapsibleStyles from 'styles/collapsible.module.css'
import styles from 'styles/toc.module.css'
import { useRef } from 'react'

const items = [
  { value: 'overview', depth: 2, label: 'Overview', lines: 8 },
  { value: 'prerequisites', depth: 2, label: 'Prerequisites', lines: 5 },
  { value: 'quick-start', depth: 2, label: 'Quick Start', lines: 20 },
  { value: 'commands', depth: 2, label: 'Core Commands', lines: 15 },
  { value: 'troubleshooting', depth: 2, label: 'Troubleshooting', lines: 12 },
]

export const WithCollapsible = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Toc.Root className={styles.Root} data-stacked items={items} getScrollEl={() => contentRef.current}>
      <Collapsible.Root className={CollapsibleStyles.Root} style={{ width: '100%' }}>
        <Toc.Context>
          {({ activeItems }) => {
            const activeIndex = items.findIndex((i) => i.value === activeItems[0]?.value)
            const activeLabel = items[activeIndex]?.label ?? 'On this page'

            return (
              <Collapsible.Trigger className={CollapsibleStyles.Trigger}>
                <span className={styles.TriggerContent}>
                  <Ring index={activeIndex} total={items.length} />
                  <span key={activeLabel} className={styles.TriggerLabel}>
                    {activeLabel}
                  </span>
                </span>
                <Collapsible.Indicator className={CollapsibleStyles.Indicator}>
                  <ChevronRightIcon />
                </Collapsible.Indicator>
              </Collapsible.Trigger>
            )
          }}
        </Toc.Context>
        <Collapsible.Content className={CollapsibleStyles.Content}>
          <Toc.List className={styles.List}>
            {items.map((item, index) => (
              <Toc.Item className={styles.Item} key={item.value} item={item}>
                <Toc.Link className={styles.LinkNumbered} href={`#${item.value}`}>
                  <span className={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </Collapsible.Content>
      </Collapsible.Root>

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
    </Toc.Root>
  )
}

const Ring = ({ index, total }: { index: number; total: number }) => {
  const progress = index >= 0 ? (index + 1) / total : 0
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true" className={styles.ProgressRing}>
      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        pathLength="100"
        stroke="var(--demo-coral-solid)"
        strokeWidth="2.5"
        strokeDasharray={`${progress * 100} 100`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
        style={{ transition: 'stroke-dasharray 0.4s ease-out' }}
      />
      <text
        key={index}
        x="18"
        y="18"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="600"
        fill="currentColor"
        className={styles.ProgressIndexText}
      >
        {index >= 0 ? index + 1 : '—'}
      </text>
    </svg>
  )
}
