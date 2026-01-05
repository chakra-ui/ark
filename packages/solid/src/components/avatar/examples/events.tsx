import { Avatar } from '@ark-ui/solid/avatar'
import styles from 'styles/avatar.module.css'

export const Events = () => {
  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }

  return (
    <Avatar.Root class={styles.Root} onStatusChange={handleStatusChange}>
      <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
      <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/3000" alt="avatar" />
    </Avatar.Root>
  )
}
