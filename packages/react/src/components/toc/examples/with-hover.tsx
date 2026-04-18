import { Toc } from '@ark-ui/react/toc'
import { Swap } from '@ark-ui/react/swap'
import { Pin, PinOff } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const WithHover = () => {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root
      className={`${styles.Root} ${styles.HoverRoot}`}
      items={items}
      rootMargin="0px 0px -80% 0px"
      getScrollEl={() => contentRef.current}
    >
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
      <Toc.Nav
        className={styles.NavHover}
        data-expanded={hovered || pinned || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (!hovered && !pinned) setPinned(true)
        }}
      >
        <button
          type="button"
          className={styles.PinButton}
          onClick={() => setPinned((v) => !v)}
          aria-label={pinned ? 'Unpin navigation' : 'Pin navigation'}
        >
          <Swap.Root swap={pinned}>
            <Swap.Indicator type="on">
              <PinOff size={12} />
            </Swap.Indicator>
            <Swap.Indicator type="off">
              <Pin size={12} />
            </Swap.Indicator>
          </Swap.Root>
        </button>

        <Swap.Root className={styles.HoverSwap} swap={hovered || pinned}>
          <Swap.Indicator type="off">
            <div className={styles.HoverSkeletons}>
              {items.map((item) => (
                <span
                  key={item.value}
                  className={styles.SkeletonBar}
                  style={{ width: `${Math.min(Math.max(item.label.length * 3, 16), 48)}px` }}
                />
              ))}
            </div>
          </Swap.Indicator>
          <Swap.Indicator type="on">
            <div>
              <Toc.List className={styles.HoverList}>
                {items.map((item) => (
                  <Toc.Item key={item.value} item={item} className={styles.Item}>
                    <Toc.Link className={styles.HoverLink} href={`#${item.value}`}>
                      {item.label}
                    </Toc.Link>
                  </Toc.Item>
                ))}
              </Toc.List>
            </div>
          </Swap.Indicator>
        </Swap.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
