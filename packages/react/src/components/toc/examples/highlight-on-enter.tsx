import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

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
      <p>
        Good software follows a set of guiding principles that inform every decision from API design to implementation
        details.
      </p>
      <h2 id="accessibility">Accessibility</h2>
      <p>
        Every component ships with ARIA attributes and keyboard navigation baked in. Accessibility is not an
        afterthought.
      </p>
      <h2 id="performance">Performance</h2>
      <p>Measure before optimizing. The bottleneck is rarely where you expect. Profile first, then act on real data.</p>
      <h2 id="testing">Testing</h2>
      <p>
        Tests give you confidence that your code works as intended. A good suite catches regressions before they reach
        production.
      </p>
      <h2 id="tooling">Tooling</h2>
      <p>
        Great tooling removes friction. Invest in your development environment the same way you invest in your product.
      </p>
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
