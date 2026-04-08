import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'background', depth: 2 },
  { value: 'motivation', depth: 2 },
  { value: 'design-decisions', depth: 2 },
  { value: 'future-plans', depth: 2 },
]

export const Context = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      <h2 id="background">Background</h2>
      <p>
        This project started as an internal tool before being open-sourced. The original motivation was to avoid
        rebuilding the same components across multiple products.
      </p>
      <h2 id="motivation">Motivation</h2>
      <p>
        Existing solutions were either too opinionated about styling or too low-level to use productively. We needed
        something in between.
      </p>
      <h2 id="design-decisions">Design Decisions</h2>
      <p>
        We chose state machines as the foundation because they make interaction logic explicit, testable, and shareable
        across framework implementations.
      </p>
      <h2 id="future-plans">Future Plans</h2>
      <p>
        The roadmap includes more components, improved accessibility tooling, and tighter integration with design token
        workflows.
      </p>
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
                  <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
                </Toc.Item>
              ))}
            </Toc.List>
          </>
        )}
      </Toc.Context>
    </Toc.Nav>
  </Toc.Root>
)
