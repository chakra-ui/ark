import { Avatar } from '@ark-ui/solid/avatar'
import { createSignal } from 'solid-js'
import styles from 'styles/avatar.module.css'

export const Events = () => {
  const [status, setStatus] = createSignal('loading...')

  return (
    <div class="vstack">
      <output>Status: {status()}</output>
      <Avatar.Root class={styles.Root} onStatusChange={(e) => setStatus(e.status)}>
        <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
      </Avatar.Root>
    </div>
  )
}
