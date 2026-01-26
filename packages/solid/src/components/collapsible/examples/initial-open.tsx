import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/collapsible.module.css'

export const InitialOpen = () => (
  <Collapsible.Root class={styles.Root} defaultOpen>
    <Collapsible.Trigger class={styles.Trigger}>
      Welcome Message
      <Collapsible.Indicator class={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content class={styles.Content}>
      <div class={styles.Body}>This content is visible by default when the component first renders.</div>
    </Collapsible.Content>
  </Collapsible.Root>
)
