import { Avatar } from '@ark-ui/react/avatar'
import styles from 'styles/avatar.module.css'

export const Context = () => (
  <Avatar.Root className={styles.Root}>
    <Avatar.Context>
      {(avatar) => <Avatar.Fallback className={styles.Fallback}>{avatar.loaded ? 'PA' : 'Loading'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image className={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.Root>
)
