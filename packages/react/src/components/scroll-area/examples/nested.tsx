import { ScrollArea } from '@ark-ui/react/scroll-area'
import styles from 'styles/scroll-area.module.css'

export const Nested = () => (
  <ScrollArea.Root className={styles.Root} style={{ height: '12rem' }}>
    <ScrollArea.Viewport className={styles.Viewport}>
      <ScrollArea.Content className={styles.Content}>
        <p className={styles.Paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <ScrollArea.Root className={styles.Root} style={{ height: '8rem', width: '100%' }}>
          <ScrollArea.Viewport className={styles.Viewport}>
            <ScrollArea.Content className={styles.Content}>
              <p className={styles.Paragraph}>
                This is a nested scroll area. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className={styles.Scrollbar}>
            <ScrollArea.Thumb className={styles.Thumb} />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className={styles.Corner} />
        </ScrollArea.Root>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical" className={styles.Scrollbar}>
      <ScrollArea.Thumb className={styles.Thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className={styles.Corner} />
  </ScrollArea.Root>
)
