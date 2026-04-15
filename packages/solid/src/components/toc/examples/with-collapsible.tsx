import { Collapsible } from '@ark-ui/solid/collapsible'
import { Toc } from '@ark-ui/solid/toc'
import { loremIpsum } from 'lorem-ipsum'
import { ChevronRightIcon } from 'lucide-solid'
import CollapsibleStyles from 'styles/Collapsible.module.css'
import styles from 'styles/toc.module.css'

const p = loremIpsum({ count: 7, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const WithCollapsible = () => (
  <Toc.Root class={`${styles.Root} ${styles.RootStacked}`} items={items}>
    <Toc.Content class={styles.Content}>
      {items.map((item) => (
        <section>
          <h2 id={item.value}>{item.label}</h2>
          <p>{p}</p>
        </section>
      ))}
    </Toc.Content>

    <Toc.Nav class={styles.Nav}>
      <Collapsible.Root class={CollapsibleStyles.Root} style={{ width: '100%' }}>
        <Toc.Context>
          {(toc) => {
            const activeIndex = () => {
              const activeItems = toc().activeItems
              return activeItems[0] ? items.findIndex((i) => i.value === activeItems[0].value) : -1
            }
            const activeLabel = () => (activeIndex() >= 0 ? items[activeIndex()].label : undefined)
            const dashArray = () =>
              `${(activeIndex() >= 0 ? (activeIndex() + 1) / items.length : 0) * CIRCUMFERENCE} ${CIRCUMFERENCE}`

            return (
              <Collapsible.Trigger class={CollapsibleStyles.Trigger}>
                <span class={styles.TriggerContent}>
                  <span class={styles.ProgressRing}>
                    <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true">
                      <circle
                        cx="18"
                        cy="18"
                        r={RADIUS}
                        fill="none"
                        stroke="currentColor"
                        attr:stroke-opacity="0.2"
                        attr:stroke-width="2.5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r={RADIUS}
                        fill="none"
                        stroke="var(--demo-coral-solid)"
                        attr:stroke-width="2.5"
                        attr:stroke-dasharray={dashArray()}
                        attr:stroke-linecap="round"
                        transform="rotate(-90 18 18)"
                        style={{ transition: 'stroke-dasharray 0.4s ease-out' }}
                      />
                      <text
                        x="18"
                        y="18"
                        attr:text-anchor="middle"
                        attr:dominant-baseline="central"
                        attr:font-size="10"
                        attr:font-weight="600"
                        fill="currentColor"
                        class={styles.ProgressIndexText}
                      >
                        {activeIndex() >= 0 ? activeIndex() + 1 : '—'}
                      </text>
                    </svg>
                  </span>
                  <span class={styles.TriggerLabel}>{activeLabel() ?? 'On this page'}</span>
                </span>
                <Collapsible.Indicator class={CollapsibleStyles.Indicator}>
                  <ChevronRightIcon />
                </Collapsible.Indicator>
              </Collapsible.Trigger>
            )
          }}
        </Toc.Context>
        <Collapsible.Content class={CollapsibleStyles.Content}>
          <Toc.List class={styles.List}>
            {items.map((item, index) => (
              <Toc.Item class={styles.Item} item={item}>
                <Toc.Link class={styles.LinkNumbered} href={`#${item.value}`}>
                  <span class={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </Collapsible.Content>
      </Collapsible.Root>
    </Toc.Nav>
  </Toc.Root>
)
