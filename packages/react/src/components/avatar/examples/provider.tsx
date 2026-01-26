import { Avatar, useAvatar } from '@ark-ui/react/avatar'
import styles from 'styles/avatar.module.css'

export const Provider = () => {
  const avatar = useAvatar({
    onStatusChange: (e) => console.log('status changed', e),
  })

  return (
    <Avatar.RootProvider className={styles.Root} value={avatar}>
      <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
      <Avatar.Image className={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
    </Avatar.RootProvider>
  )
}
