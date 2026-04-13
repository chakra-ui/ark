import { Toc, useToc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'principles', depth: 2 },
  { value: 'patterns', depth: 2 },
  { value: 'testing', depth: 2 },
  { value: 'performance', depth: 2 },
]

export default function RootProvider() {
  const toc = useToc({ items })
  return (
    <Toc.RootProvider class={styles.Root} value={toc}>
      <Toc.Content class={styles.Content}>
        <h2 id="principles">Principles</h2>
        <p>
          Good software follows a set of guiding principles. These inform every decision from API design to
          implementation details.
        </p>
        <h2 id="patterns">Patterns</h2>
        <p>
          Design patterns are reusable solutions to common problems. Learning them helps you recognize familiar
          structures in new codebases.
        </p>
        <h2 id="testing">Testing</h2>
        <p>
          Tests give you confidence that your code works as intended. A good test suite catches regressions before they
          reach production.
        </p>
        <h2 id="performance">Performance</h2>
        <p>
          Performance is a feature. Measure before optimizing, and optimize the things that matter most to your users.
        </p>
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          <Toc.Indicator class={styles.Indicator} />
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.RootProvider>
  )
}
