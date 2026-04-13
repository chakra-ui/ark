import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'background', depth: 2, label: 'Background' },
  { value: 'motivation', depth: 2, label: 'Motivation' },
  { value: 'design-decisions', depth: 2, label: 'Design Decisions' },
  { value: 'future-plans', depth: 2, label: 'Future Plans' },
]

export const Context = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="background">Background</h2>
      <p>{p}</p>
      <h2 id="motivation">Motivation</h2>
      <p>{p}</p>
      <h2 id="design-decisions">Design Decisions</h2>
      <p>{p}</p>
      <h2 id="future-plans">Future Plans</h2>
      <p>{p}</p>
    </Toc.Content>

    <Toc.Nav className={styles.Nav}>
      <Toc.Context>
        {(toc) => (
          <>
            <Toc.Title className={styles.Title}>On this page ({toc.activeIds.length} visible)</Toc.Title>
            <Toc.Indicator className={styles.Indicator} />
            <Toc.List className={styles.List}>
              {items.map((item) => (
                <Toc.Item className={styles.Item} key={item.value} item={item}>
                  <Toc.Link className={styles.Link}>{item.label}</Toc.Link>
                </Toc.Item>
              ))}
            </Toc.List>
          </>
        )}
      </Toc.Context>
    </Toc.Nav>
  </Toc.Root>
)
