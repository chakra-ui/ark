import { Toc } from '@ark-ui/react/toc'
import { BookOpenIcon } from 'lucide-react'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'usage', depth: 2 },
  { value: 'api', depth: 2 },
]

export const CustomRendering = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="introduction">Introduction</h2>
      <p>Custom rendering with icons.</p>
      <h2 id="usage">Usage</h2>
      <p>How to use custom links in your ToC.</p>
      <h2 id="api">API</h2>
      <p>API reference section.</p>
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item className={styles.Item} key={item.value} item={item}>
            <Toc.Link asChild>
              <a href={`#${item.value}`} className={`${styles.Link} ${styles.LinkWithIcon}`}>
                <BookOpenIcon size={12} />
                {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
              </a>
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
