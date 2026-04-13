import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'guides', depth: 2 },
  { value: 'quick-start', depth: 3 },
  { value: 'manual-setup', depth: 3 },
  { value: 'core-concepts', depth: 2 },
  { value: 'props', depth: 3 },
  { value: 'events', depth: 3 },
  { value: 'context', depth: 3 },
  { value: 'advanced', depth: 2 },
  { value: 'root-provider', depth: 3 },
  { value: 'custom-rendering', depth: 3 },
]

export default function Nested() {
  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="guides">Guides</h2>
        <p>Step-by-step guides for getting the most out of Ark UI in your projects.</p>
        <h3 id="quick-start">Quick Start</h3>
        <p>Install the package and render your first component in under two minutes. No configuration required.</p>
        <h3 id="manual-setup">Manual Setup</h3>
        <p>For projects that need fine-grained control over the setup, follow the manual configuration guide.</p>
        <h2 id="core-concepts">Core Concepts</h2>
        <p>Understanding the core concepts helps you use the library more effectively.</p>
        <h3 id="props">Props</h3>
        <p>Props control the machine context. Pass them directly to the Root component or via the hook.</p>
        <h3 id="events">Events</h3>
        <p>Callback props like onValueChange fire when the machine transitions to a new state.</p>
        <h3 id="context">Context</h3>
        <p>Every component exposes a Context render prop for accessing the machine API without an extra hook.</p>
        <h2 id="advanced">Advanced</h2>
        <p>Advanced patterns for complex use cases.</p>
        <h3 id="root-provider">Root Provider</h3>
        <p>
          Use the RootProvider pattern to call the hook at a higher level and share the API with components outside the
          tree.
        </p>
        <h3 id="custom-rendering">Custom Rendering</h3>
        <p>
          Use the asChild prop to render any component part as a custom element while keeping all aria and event
          attributes.
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
