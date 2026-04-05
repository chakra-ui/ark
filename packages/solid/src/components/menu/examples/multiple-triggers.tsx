import { Menu } from '@ark-ui/solid/menu'
import { Portal } from 'solid-js/web'
import { EllipsisVerticalIcon } from 'lucide-solid'
import { For } from 'solid-js'
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
    <div class={styles.MessageList}>
      <For each={messages}>
        {(msg) => (
          <div class={styles.MessageItem}>
            <div class={styles.MessageContent}>
              <div class={styles.MessageSender}>{msg.sender}</div>
              <div class={styles.MessagePreview}>{msg.preview}</div>
            </div>
            <Menu.Trigger value={msg.id} class={styles.MessageAction}>
              <EllipsisVerticalIcon />
            </Menu.Trigger>
          </div>
        )}
      </For>
    </div>
    <Portal>
      <Menu.Positioner class={styles.Positioner}>
        <Menu.Content class={styles.Content}>
          <Menu.Item class={styles.Item} value="reply">
            Reply
          </Menu.Item>
          <Menu.Item class={styles.Item} value="forward">
            Forward
          </Menu.Item>
          <Menu.Item class={styles.Item} value="archive">
            Archive
          </Menu.Item>
          <Menu.Separator class={styles.Separator} />
          <Menu.Item class={styles.Item} value="delete">
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)
