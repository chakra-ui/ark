import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'getting-started', depth: 2 },
  { value: 'installation', depth: 2 },
  { value: 'usage', depth: 2 },
  { value: 'api-reference', depth: 2 },
]

export default function Basic() {
  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="introduction">Introduction</h2>
        <p>
          A table of contents helps readers navigate long documents by providing quick links to each section. It
          automatically highlights the section currently visible in the viewport.
        </p>
        <h2 id="getting-started">Getting Started</h2>
        <p>
          To get started, pass an array of items to the root component. Each item has a value matching the heading id
          and a depth matching the heading level.
        </p>
        <h2 id="installation">Installation</h2>
        <p>
          Install the package using your preferred package manager. The component has no external dependencies beyond
          the state machine.
        </p>
        <h2 id="usage">Usage</h2>
        <p>
          Import the component and compose it using the compound component pattern. The Root component manages the
          IntersectionObserver internally.
        </p>
        <h2 id="api-reference">API Reference</h2>
        <p>
          The full API reference documents all props, events, and methods available on each component part. Refer to it
          when customizing behavior.
        </p>
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
