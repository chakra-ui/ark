import { Avatar, useAvatar } from '@ark-ui/solid/avatar'
import styles from 'styles/avatar.module.css'

export const RootProvider = () => {
  const avatar = useAvatar()

  return (
    <>
      <button onClick={() => avatar().setSrc('https://new-source.com')}>Change Source</button>

      <Avatar.RootProvider class={styles.Root} value={avatar}>
        <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/300" alt="avatar" />
      </Avatar.RootProvider>
    </>
  )
}
