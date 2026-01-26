import { Avatar } from '@ark-ui/react/avatar'
import styles from 'styles/avatar.module.css'

export const Basic = () => (
  <Avatar.Root className={styles.Root}>
    <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
    <Avatar.Image className={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.Root>
)
