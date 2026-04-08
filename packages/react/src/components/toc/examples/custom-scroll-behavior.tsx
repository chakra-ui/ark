import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'alpha', depth: 2 },
  { value: 'beta', depth: 2 },
  { value: 'gamma', depth: 2 },
]

export const CustomScrollBehavior = () => {
  const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <Toc.Root className={styles.Root} items={items}>
      <Toc.Content className={styles.Content}>
        <h2 id="alpha">Alpha</h2>
        <p>Section Alpha content.</p>
        <h2 id="beta">Beta</h2>
        <p>Section Beta content.</p>
        <h2 id="gamma">Gamma</h2>
        <p>Section Gamma content.</p>
      </Toc.Content>
      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item key={item.value} item={item} className={styles.Item}>
              <Toc.Link className={styles.Link} onClick={(e) => scrollToId(e, item.value)}>
                {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
