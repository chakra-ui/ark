import { Avatar } from '@ark-ui/solid/avatar'
import styles from 'styles/avatar.module.css'

export const Context = () => (
  <Avatar.Root class={styles.Root}>
    <Avatar.Context>
      {(avatar) => <Avatar.Fallback class={styles.Fallback}>{avatar().loaded ? 'PA' : 'Loading'}</Avatar.Fallback>}
    </Avatar.Context>
    <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
  </Avatar.Root>
)
