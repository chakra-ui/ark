import { Toc } from '@ark-ui/solid/toc'
import { createSignal } from 'solid-js'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'overview', depth: 2, label: 'Overview' },
  { value: 'architecture', depth: 2, label: 'Architecture' },
  { value: 'state-machines', depth: 2, label: 'State Machines' },
  { value: 'components', depth: 2, label: 'Components' },
  { value: 'theming', depth: 2, label: 'Theming' },
]

export const ReadingProgress = () => {
  let contentEl: HTMLElement | undefined
  const [progress, setProgress] = createSignal(0)

  const handleScroll = () => {
    if (!contentEl) return
    const { scrollTop, scrollHeight, clientHeight } = contentEl
    const total = scrollHeight - clientHeight
    setProgress(total > 0 ? scrollTop / total : 0)
  }

  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content} ref={contentEl} onScroll={handleScroll}>
        <h2 id="overview">Overview</h2>
        <p>{p}</p>
        <h2 id="architecture">Architecture</h2>
        <p>{p}</p>
        <h2 id="state-machines">State Machines</h2>
        <p>{p}</p>
        <h2 id="components">Components</h2>
        <p>{p}</p>
        <h2 id="theming">Theming</h2>
        <p>{p}</p>
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <div class={styles.Progress}>
          <div class={styles.ProgressBar} style={{ '--progress': progress() }} />
        </div>
        <Toc.Indicator class={styles.Indicator} />
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
