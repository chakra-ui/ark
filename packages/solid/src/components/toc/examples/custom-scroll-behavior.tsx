import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'alpha', depth: 2 },
  { value: 'beta', depth: 2 },
  { value: 'gamma', depth: 2 },
]

export default function CustomScrollBehavior() {
  const scrollToId = (e: MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="alpha">Alpha</h2>
        <p>Section Alpha content.</p>
        <h2 id="beta">Beta</h2>
        <p>Section Beta content.</p>
        <h2 id="gamma">Gamma</h2>
        <p>Section Gamma content.</p>
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link} href={`#${item.value}`}>
                {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
