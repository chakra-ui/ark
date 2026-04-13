import { Toc } from '@ark-ui/solid/toc'
import { createSignal } from 'solid-js'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

export default function WithCollapsible() {
  const [open, setOpen] = createSignal(false)
  const [progress, setProgress] = createSignal(0)

  // Simulate progress for demo
  // In a real app, calculate based on scroll or active section
  const handleToggle = () => {
    setOpen((prev) => !prev)
    setProgress((prev) => (prev >= 1 ? 0 : prev + 0.2))
  }

  const RADIUS = 14
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS
  const dashArray = () => `${progress() * CIRCUMFERENCE} ${CIRCUMFERENCE}`

  return (
    <Toc.Root class={`${styles.Root} ${styles.RootStacked}`} items={items}>
      <Toc.Content class={styles.Content}>
        {items.map((item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <p>Section content for {item.label}.</p>
          </section>
        ))}
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <button onClick={handleToggle} class={styles.TriggerContent}>
          <span class={styles.ProgressRing}>
            <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true">
              <circle
                cx="18"
                cy="18"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                stroke-opacity="0.2"
                stroke-width="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-dasharray={dashArray()}
                style="transition: stroke-dasharray 0.3s"
              />
            </svg>
          </span>
          {open() ? 'Collapse' : 'Expand'}
        </button>
        {open() && (
          <Toc.List class={styles.List}>
            {items.map((item) => (
              <Toc.Item class={styles.Item} item={item}>
                <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        )}
      </Toc.Nav>
    </Toc.Root>
  )
}
