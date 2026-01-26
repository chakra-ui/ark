import { Collapsible, useCollapsible } from '@ark-ui/solid/collapsible'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/collapsible.module.css'

export const RootProvider = () => {
  const collapsible = useCollapsible()

  return (
    <div class="stack">
      <output>
        open: {String(collapsible().open)}, visible: {String(collapsible().visible)}
      </output>
      <Collapsible.RootProvider class={styles.Root} value={collapsible}>
        <Collapsible.Trigger class={styles.Trigger}>
          Toggle Panel
          <Collapsible.Indicator class={styles.Indicator}>
            <ChevronRightIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content class={styles.Content}>
          <div class={styles.Body}>
            This panel can be toggled by the button above, which uses the useCollapsible hook for state management.
          </div>
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </div>
  )
}
