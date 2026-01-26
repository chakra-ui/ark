import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const PartialCollapse = () => (
  <Collapsible.Root className={styles.Root} collapsedHeight="100px">
    <Collapsible.Trigger className={styles.Trigger}>
      Read More
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        <p>
          Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid,
          Vue, and Svelte. It provides unstyled, fully accessible components that you can customize to match your design
          system.
        </p>
        <p>
          Built on top of Zag.js state machines, Ark UI ensures consistent behavior across all frameworks while giving
          you complete control over styling. Each component follows WAI-ARIA patterns for accessibility out of the box.
        </p>
        <p>
          Whether you're building a design system from scratch or need reliable primitives for your next project, Ark UI
          provides the foundation you need without imposing any visual constraints.
        </p>
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
