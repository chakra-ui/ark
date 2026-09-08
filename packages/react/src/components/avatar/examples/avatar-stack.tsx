import { Avatar } from '@ark-ui/react/avatar'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
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
  <div className={styles.Stack}>
    {visible.map((user) => (
      <Avatar.Root key={user.id} className={styles.Root}>
        <Avatar.Fallback className={styles.Fallback}>{user.initials}</Avatar.Fallback>
        <Avatar.Image className={styles.Image} src={user.src} alt={user.name} />
      </Avatar.Root>
    ))}
    {hidden.length > 0 && (
      <Menu.Root>
        <Menu.Trigger
          render={
            <Avatar.Root className={styles.Root}>
              <Avatar.Fallback className={styles.Fallback}>+{hidden.length}</Avatar.Fallback>
            </Avatar.Root>
          }
        />
        <Portal>
          <Menu.Positioner>
            <Menu.Content className={menuStyles.Content}>
              {hidden.map((user) => (
                <Menu.Item key={user.id} className={menuStyles.Item} value={user.id}>
                  <Avatar.Root className={styles.MenuAvatar}>
                    <Avatar.Fallback className={styles.Fallback}>{user.initials}</Avatar.Fallback>
                    <Avatar.Image className={styles.Image} src={user.src} alt={user.name} />
                  </Avatar.Root>
                  {user.name}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    )}
  </div>
)
