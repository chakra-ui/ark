import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'overview', depth: 2 },
  { value: 'architecture', depth: 2 },
  { value: 'state-machines', depth: 2 },
  { value: 'components', depth: 2 },
  { value: 'theming', depth: 2 },
  { value: 'accessibility', depth: 2 },
]

export default function WithIndicator() {
  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="overview">Overview</h2>
        <p>
          Ark UI is a headless component library built on top of Zag.js state machines. It provides unstyled, accessible
          components ready for your design system.
        </p>
        <h2 id="architecture">Architecture</h2>
        <p>
          The library follows a layered architecture. At the base are the Zag.js machines, which handle all interaction
          logic. On top of that, framework adapters expose idiomatic React, Solid, Vue, and Svelte APIs.
        </p>
        <h2 id="state-machines">State Machines</h2>
        <p>
          State machines make the interaction logic predictable and testable. Every possible state is explicitly
          defined, making it impossible to end up in an undefined state.
        </p>
        <h2 id="components">Components</h2>
        <p>
          Components are structured using the compound component pattern. A Root component holds state and provides it
          to all child parts via context.
        </p>
        <h2 id="theming">Theming</h2>
        <p>
          Because components ship without styles, you own every pixel. Bring your own CSS, CSS modules, Tailwind, or any
          styling solution that works in your stack.
        </p>
        <h2 id="accessibility">Accessibility</h2>
        <p>
          All components follow WAI-ARIA patterns and are tested with screen readers. Keyboard navigation is built into
          the state machine, not bolted on after the fact.
        </p>
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Indicator class={styles.Indicator} />
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
