import { Avatar } from '@ark-ui/solid/avatar'
import { Menu } from '@ark-ui/solid/menu'
import { For, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/avatar.module.css'
import menuStyles from 'styles/menu.module.css'

const users = [
  { id: 'pa', name: 'Pauline Adebayo', initials: 'PA', src: 'https://i.pravatar.cc/300?u=a' },
  { id: 'mk', name: 'Marcus Kim', initials: 'MK', src: 'https://i.pravatar.cc/300?u=b' },
  { id: 'jr', name: 'Jordan Reed', initials: 'JR', src: 'https://i.pravatar.cc/300?u=c' },
  { id: 'sl', name: 'Sara Liu', initials: 'SL', src: 'https://i.pravatar.cc/300?u=d' },
  { id: 'tw', name: 'Taylor West', initials: 'TW', src: 'https://i.pravatar.cc/300?u=e' },
]

const max = 3
const visible = users.slice(0, max)
const hidden = users.slice(max)

export const AvatarStack = () => (
  <div class={styles.Stack}>
    <For each={visible}>
      {(user) => (
        <Avatar.Root class={styles.Root}>
          <Avatar.Fallback class={styles.Fallback}>{user.initials}</Avatar.Fallback>
          <Avatar.Image class={styles.Image} src={user.src} alt={user.name} />
        </Avatar.Root>
      )}
    </For>
    <Show when={hidden.length > 0}>
      <Menu.Root>
        <Menu.Trigger
          render={(props) => (
            <Avatar.Root {...props({ class: styles.Root })}>
              <Avatar.Fallback class={styles.Fallback}>+{hidden.length}</Avatar.Fallback>
            </Avatar.Root>
          )}
        />
        <Portal>
          <Menu.Positioner>
            <Menu.Content class={menuStyles.Content}>
              <For each={hidden}>
                {(user) => (
                  <Menu.Item class={menuStyles.Item} value={user.id}>
                    <Avatar.Root class={styles.MenuAvatar}>
                      <Avatar.Fallback class={styles.Fallback}>{user.initials}</Avatar.Fallback>
                      <Avatar.Image class={styles.Image} src={user.src} alt={user.name} />
                    </Avatar.Root>
                    {user.name}
                  </Menu.Item>
                )}
              </For>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Show>
  </div>
)
