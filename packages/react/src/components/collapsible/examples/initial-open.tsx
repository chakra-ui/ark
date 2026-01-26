import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const InitialOpen = () => (
  <Collapsible.Root className={styles.Root} defaultOpen>
    <Collapsible.Trigger className={styles.Trigger}>
      What is Ark UI?
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        Ark UI is a headless component library that works across React, Solid, Vue, and Svelte frameworks.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
