import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/collapsible.module.css'

export const LazyMount = () => (
  <Collapsible.Root class={styles.Root} lazyMount unmountOnExit>
    <Collapsible.Trigger class={styles.Trigger}>
      Session Details
      <Collapsible.Indicator class={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content class={styles.Content}>
      <div class={styles.Body}>
        This content is lazily mounted when first opened and removed from the DOM when collapsed.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
