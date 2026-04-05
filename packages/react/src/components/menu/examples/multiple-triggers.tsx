import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { EllipsisVerticalIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

interface Message {
  id: string
  sender: string
  preview: string
}

const messages: Message[] = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
]

export const MultipleTriggers = () => (
  <Menu.Root positioning={{ placement: 'right-start' }}>
    <div className={styles.MessageList}>
      {messages.map((msg) => (
        <div key={msg.id} className={styles.MessageItem}>
          <div className={styles.MessageContent}>
            <div className={styles.MessageSender}>{msg.sender}</div>
            <div className={styles.MessagePreview}>{msg.preview}</div>
          </div>
          <Menu.Trigger value={msg.id} className={styles.MessageAction}>
            <EllipsisVerticalIcon />
          </Menu.Trigger>
        </div>
      ))}
    </div>
    <Portal>
      <Menu.Positioner className={styles.Positioner}>
        <Menu.Content className={styles.Content}>
          <Menu.Item className={styles.Item} value="reply">
            Reply
          </Menu.Item>
          <Menu.Item className={styles.Item} value="forward">
            Forward
          </Menu.Item>
          <Menu.Item className={styles.Item} value="archive">
            Archive
          </Menu.Item>
          <Menu.Separator className={styles.Separator} />
          <Menu.Item className={styles.Item} value="delete">
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)
