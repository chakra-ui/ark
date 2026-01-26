import { Avatar } from '@ark-ui/solid/avatar'
import styles from 'styles/avatar.module.css'

export const Basic = () => (
  <Avatar.Root class={styles.Root}>
    <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
    <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.Root>
)
