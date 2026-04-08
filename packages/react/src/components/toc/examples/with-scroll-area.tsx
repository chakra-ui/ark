import { Toc } from '@ark-ui/react/toc'
import { ScrollArea } from '@ark-ui/react/scroll-area'
import scrollAreaStyles from 'styles/scroll-area.module.css'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'a', depth: 2 },
  { value: 'b', depth: 2 },
  { value: 'c', depth: 2 },
  { value: 'd', depth: 2 },
  { value: 'e', depth: 2 },
  { value: 'f', depth: 2 },
]

export const WithScrollArea = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="a">Section A</h2>
      <p>Content for section A.</p>
      <h2 id="b">Section B</h2>
      <p>Content for section B.</p>
      <h2 id="c">Section C</h2>
      <p>Content for section C.</p>
      <h2 id="d">Section D</h2>
      <p>Content for section D.</p>
      <h2 id="e">Section E</h2>
      <p>Content for section E.</p>
      <h2 id="f">Section F</h2>
      <p>Content for section F.</p>
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <ScrollArea.Root className={scrollAreaStyles.Root}>
        <ScrollArea.Viewport className={scrollAreaStyles.Viewport}>
          <Toc.List className={styles.List}>
            {items.map((item) => (
              <Toc.Item className={styles.Item} key={item.value} item={item}>
                <Toc.Link className={styles.Link}>Section {item.value.toUpperCase()}</Toc.Link>
              </Toc.Item>
            ))}
          </Toc.List>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Toc.Nav>
  </Toc.Root>
)
