import { Toc } from '@ark-ui/solid/toc'
import { createSignal } from 'solid-js'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api', depth: 2, label: 'API' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

export default function WithHover() {
  const [pinned, setPinned] = createSignal(false)
  const [hovered, setHovered] = createSignal(false)

  return (
    <Toc.Root class={`${styles.Root} ${styles.HoverRoot}`} items={items}>
      <Toc.Content class={styles.Content}>
        {items.map((item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <p>Section content for {item.label}.</p>
          </section>
        ))}
      </Toc.Content>
      <Toc.Nav
        class={styles.NavHover}
        data-expanded={hovered() || pinned() || undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="button"
          class={styles.PinButton}
          onClick={() => setPinned((p) => !p)}
          aria-label={pinned() ? 'Unpin navigation' : 'Pin navigation'}
        >
          {pinned() ? 'Unpin' : 'Pin'}
        </button>
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
