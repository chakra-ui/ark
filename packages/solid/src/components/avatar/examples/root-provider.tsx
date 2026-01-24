import { Avatar, useAvatar } from '@ark-ui/solid/avatar'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/avatar.module.css'

export const RootProvider = () => {
  const [count, setCount] = createSignal(0)
  const avatar = useAvatar()

  return (
    <div class="vstack">
      <button class={button.Root} onClick={() => setCount(count() + 1)}>
        Change Avatar
      </button>

      <Avatar.RootProvider class={styles.Root} value={avatar}>
        <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image class={styles.Image} src={`https://i.pravatar.cc/300?u=${count()}`} alt="avatar" />
      </Avatar.RootProvider>
    </div>
  )
}
