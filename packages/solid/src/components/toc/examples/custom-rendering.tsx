import { Toc } from '@ark-ui/solid/toc'
import { BookOpenIcon } from 'lucide-solid'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api', depth: 2, label: 'API' },
]

export const CustomRendering = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="introduction">Introduction</h2>
      <p>{p}</p>
      <h2 id="usage">Usage</h2>
      <p>{p}</p>
      <h2 id="api">API</h2>
      <p>{p}</p>
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item className={styles.Item} key={item.value} item={item}>
            <Toc.Link asChild>
              <a href={`#${item.value}`} className={`${styles.Link} ${styles.LinkWithIcon}`}>
                <BookOpenIcon size={12} />
                {item.label}
              </a>
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
