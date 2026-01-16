import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const Disabled = () => (
  <Collapsible.Root className={styles.Root} disabled>
    <Collapsible.Trigger className={styles.Trigger}>
      System Requirements
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>This section is currently unavailable.</div>
    </Collapsible.Content>
  </Collapsible.Root>
)
