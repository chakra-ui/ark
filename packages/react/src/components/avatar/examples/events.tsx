import { Avatar } from '@ark-ui/react/avatar'
import styles from 'styles/avatar.module.css'

export const Events = () => {
  const handleStatusChange = (details: Avatar.StatusChangeDetails) => {
    console.log(details.status)
  }
  return (
    <Avatar.Root className={styles.Root} onStatusChange={handleStatusChange}>
      <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
      <Avatar.Image className={styles.Image} src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
    </Avatar.Root>
  )
}
