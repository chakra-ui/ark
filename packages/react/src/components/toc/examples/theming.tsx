import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'custom1', depth: 2 },
  { value: 'custom2', depth: 2 },
  { value: 'custom3', depth: 2 },
]

export const Theming = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="custom1">Custom Style 1</h2>
      <p>Section with custom theming 1.</p>
      <h2 id="custom2">Custom Style 2</h2>
      <p>Section with custom theming 2.</p>
      <h2 id="custom3">Custom Style 3</h2>
      <p>Section with custom theming 3.</p>
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <Toc.List className={styles.List}>
        <Toc.Item className={styles.Item} item={items[0]}>
          <Toc.Link className={styles.LinkAmber}>Custom Style 1</Toc.Link>
        </Toc.Item>
        <Toc.Item className={styles.Item} item={items[1]}>
          <Toc.Link className={styles.LinkBlue}>Custom Style 2</Toc.Link>
        </Toc.Item>
        <Toc.Item className={styles.Item} item={items[2]}>
          <Toc.Link className={styles.LinkGreen}>Custom Style 3</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
