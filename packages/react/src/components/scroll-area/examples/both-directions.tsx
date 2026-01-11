import { ScrollArea } from '@ark-ui/react/scroll-area'
import styles from 'styles/scroll-area.module.css'

export const BothDirections = () => (
  <ScrollArea.Root className={styles.Root} style={{ height: '12rem' }}>
    <ScrollArea.Viewport className={styles.Viewport}>
      <ScrollArea.Content className={styles.Content}>
        <p className={styles.Paragraph} style={{ width: '50vw' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p className={styles.Paragraph} style={{ width: '50vw' }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
          dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p className={styles.Paragraph} style={{ width: '50vw' }}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical" className={styles.Scrollbar}>
      <ScrollArea.Thumb className={styles.Thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar orientation="horizontal" className={styles.Scrollbar}>
      <ScrollArea.Thumb className={styles.Thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className={styles.Corner} />
  </ScrollArea.Root>
)
