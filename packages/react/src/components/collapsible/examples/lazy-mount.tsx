import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const LazyMount = () => (
  <Collapsible.Root className={styles.Root} lazyMount unmountOnExit>
    <Collapsible.Trigger className={styles.Trigger}>
      Session Details
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        This content is lazily mounted when first opened and removed from the DOM when collapsed.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
