import { Toc } from '@ark-ui/react/toc'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'overview', depth: 2 },
  { value: 'architecture', depth: 2 },
  { value: 'state-machines', depth: 2 },
  { value: 'components', depth: 2 },
  { value: 'theming', depth: 2 },
]

export const ReadingProgress = () => {
  const contentRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = () => {
    const el = contentRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const total = scrollHeight - clientHeight
    setProgress(total > 0 ? scrollTop / total : 0)
  }

  return (
    <Toc.Root className={styles.Root} items={items}>
      <Toc.Content className={styles.Content} ref={contentRef} onScroll={handleScroll}>
        <h2 id="overview">Overview</h2>
        <p>
          Ark UI is a headless component library built on Zag.js state machines. It provides unstyled, accessible
          components for building design systems.
        </p>
        <h2 id="architecture">Architecture</h2>
        <p>
          The library follows a layered architecture. At the base are Zag.js machines handling all interaction logic.
          Framework adapters on top expose idiomatic React, Solid, Vue, and Svelte APIs.
        </p>
        <p>
          Each component is a thin wrapper around the machine. Props flow down, events bubble up, and the machine
          orchestrates all state transitions.
        </p>
        <h2 id="state-machines">State Machines</h2>
        <p>
          State machines make interaction logic predictable and testable. Every possible state is explicitly defined,
          making undefined states impossible by construction.
        </p>
        <h2 id="components">Components</h2>
        <p>
          Components use the compound component pattern. A Root component holds state and provides it to all child parts
          via React context.
        </p>
        <h2 id="theming">Theming</h2>
        <p>
          Because components ship without styles, you own every pixel. Bring your own CSS, CSS modules, Tailwind, or any
          styling solution that works in your stack.
        </p>
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <div className={styles.Progress}>
          <div className={styles.ProgressBar} style={{ '--progress': progress } as React.CSSProperties} />
        </div>
        <Toc.Indicator className={styles.Indicator} />
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
