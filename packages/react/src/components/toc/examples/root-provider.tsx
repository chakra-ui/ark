import { Toc, useToc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'principles', depth: 2 },
  { value: 'patterns', depth: 2 },
  { value: 'testing', depth: 2 },
  { value: 'performance', depth: 2 },
]

export const RootProvider = () => {
  const toc = useToc({ items })

  return (
    <Toc.RootProvider className={styles.Root} value={toc}>
      <Toc.Content className={styles.Content}>
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

      <Toc.Nav className={styles.Nav}>
        <p className={styles.ActiveIds}>Active: {toc.activeIds.length > 0 ? toc.activeIds.join(', ') : '—'}</p>

        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.List className={styles.List}>
          <Toc.Indicator className={styles.Indicator} />
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.RootProvider>
  )
}
