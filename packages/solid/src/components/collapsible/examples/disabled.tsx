import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/collapsible.module.css'

export const Disabled = () => (
  <Collapsible.Root class={styles.Root} disabled>
    <Collapsible.Trigger class={styles.Trigger}>
      System Requirements
      <Collapsible.Indicator class={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content class={styles.Content}>
      <div class={styles.Body}>This section is currently unavailable.</div>
    </Collapsible.Content>
  </Collapsible.Root>
)
