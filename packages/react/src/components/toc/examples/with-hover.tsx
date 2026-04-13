import { Toc } from '@ark-ui/react/toc'
import { Swap } from '@ark-ui/react/swap'
import { Pin, PinOff } from 'lucide-react'
import { useState } from 'react'
import { loremIpsum } from 'lorem-ipsum'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api', depth: 2, label: 'API' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })

export const WithHover = () => {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <Toc.Root className={`${styles.Root} ${styles.HoverRoot}`} items={items}>
      <article className={styles.Content}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value}>{item.label}</h2>
            <p>{paragraphs}</p>
          </section>
        ))}
      </article>
      <Toc.Nav
        className={styles.NavHover}
        data-expanded={hovered || pinned || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
