import { Avatar, useAvatar } from '@ark-ui/react/avatar'
import styles from 'styles/avatar.module.css'

export const RootProvider = () => {
  const avatar = useAvatar()

  return (
    <>
      <button onClick={() => avatar.setSrc('https://avatars.githubusercontent.com/u/6916170?v=4')}>
        Change Source
      </button>

      <Avatar.RootProvider className={styles.Root} value={avatar}>
        <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image className={styles.Image} src="https://avatars.githubusercontent.com/u/1846056?v=4" alt="avatar" />
      </Avatar.RootProvider>
    </>
  )
}
