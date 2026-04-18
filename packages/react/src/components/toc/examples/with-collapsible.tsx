import { Collapsible } from '@ark-ui/react/collapsible'
import { Toc } from '@ark-ui/react/toc'
import { ChevronRightIcon } from 'lucide-react'
import CollapsibleStyles from 'styles/collapsible.module.css'
import styles from 'styles/toc.module.css'
import { useRef } from 'react'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const WithCollapsible = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root className={`${styles.Root} ${styles.RootStacked}`} items={items} getScrollEl={() => contentRef.current}>
      {/* Collapsible nav always on top */}
      <div style={{ width: '100%', marginBottom: '1rem' }}>
        <Collapsible.Root className={CollapsibleStyles.Root} style={{ width: '100%' }}>
          <Toc.Context>
            {({ activeItems }) => {
              const activeIndex = activeItems[0] ? items.findIndex((i) => i.value === activeItems[0].value) : -1
              const activeLabel = activeIndex >= 0 ? items[activeIndex].label : undefined
              const progress = activeIndex >= 0 ? (activeIndex + 1) / items.length : 0
              const dashArray = `${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`

              return (
                <Collapsible.Trigger className={CollapsibleStyles.Trigger}>
                  <span className={styles.TriggerContent}>
                    <span className={styles.ProgressRing}>
                      <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true">
                        <circle
                          cx="18"
                          cy="18"
                          r={RADIUS}
                          fill="none"
                          stroke="currentColor"
                          strokeOpacity="0.2"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r={RADIUS}
                          fill="none"
                          stroke="var(--demo-coral-solid)"
                          strokeWidth="2.5"
                          strokeDasharray={dashArray}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                          style={{ transition: 'stroke-dasharray 0.4s ease-out' }}
                        />
                        <text
                          key={activeIndex}
                          x="18"
                          y="18"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="10"
                          fontWeight="600"
                          fill="currentColor"
                          className={styles.ProgressIndexText}
                        >
                          {activeIndex >= 0 ? activeIndex + 1 : '—'}
                        </text>
                      </svg>
                    </span>
                    <span key={activeLabel ?? ''} className={styles.TriggerLabel}>
                      {activeLabel ?? 'On this page'}
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
      </div>

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
    </Toc.Root>
  )
}
