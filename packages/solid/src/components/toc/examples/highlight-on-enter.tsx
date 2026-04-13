import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'principles', depth: 2 },
  { value: 'accessibility', depth: 2 },
  { value: 'performance', depth: 2 },
  { value: 'testing', depth: 2 },
  { value: 'tooling', depth: 2 },
]

export const HighlightOnEnter = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="principles">Principles</h2>
      <p>{p}</p>
      <h2 id="accessibility">Accessibility</h2>
      <p>{p}</p>
      <h2 id="performance">Performance</h2>
      <p>{p}</p>
      <h2 id="testing">Testing</h2>
      <p>{p}</p>
      <h2 id="tooling">Tooling</h2>
      <p>{p}</p>
    </Toc.Content>

    <Toc.Nav className={styles.Nav}>
      <Toc.Title className={styles.Title}>On this page</Toc.Title>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item className={styles.Item} key={item.value} item={item}>
            <Toc.Link className={styles.LinkAnimated}>{item.value.replace(/-/g, ' ')}</Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
