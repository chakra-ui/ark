import { Collapsible, useCollapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const RootProvider = () => {
  const collapsible = useCollapsible()

  return (
    <div className="stack">
      <output>
        collapsible: {String(collapsible.open)}, visible: {String(collapsible.visible)}
      </output>
      <Collapsible.RootProvider className={styles.Root} value={collapsible}>
        <Collapsible.Trigger className={styles.Trigger}>
          Toggle Panel
          <Collapsible.Indicator className={styles.Indicator}>
            <ChevronRightIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.Content}>
          <div className={styles.Body}>
            This panel can be toggled by the button above, which uses the useCollapsible hook for state management.
          </div>
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </div>
  )
}
