import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/collapsible.module.css'

export const Basic = () => (
  <Collapsible.Root class={styles.Root}>
    <Collapsible.Trigger class={styles.Trigger}>
      What is Ark UI?
      <Collapsible.Indicator class={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content class={styles.Content}>
      <div class={styles.Body}>
        Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid,
        Vue, and Svelte.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
