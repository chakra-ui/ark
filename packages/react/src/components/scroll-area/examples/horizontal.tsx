import { ScrollArea } from '@ark-ui/react/scroll-area'
import styles from 'styles/scroll-area.module.css'

export const Horizontal = () => (
  <ScrollArea.Root className={styles.Root} style={{ height: 'auto' }}>
    <ScrollArea.Viewport className={styles.Viewport}>
      <ScrollArea.Content className={styles.Content}>
        <p className={styles.Paragraph} style={{ width: '50vw' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="horizontal" className={styles.Scrollbar}>
      <ScrollArea.Thumb className={styles.Thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className={styles.Corner} />
  </ScrollArea.Root>
)
