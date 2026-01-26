import { Toggle } from '@ark-ui/solid/toggle'
import { HeartIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/toggle.module.css'

export const Controlled = () => {
  const [pressed, setPressed] = createSignal(false)
  return (
    <Toggle.Root class={styles.Root} pressed={pressed()} onPressedChange={setPressed}>
      <Toggle.Indicator class={styles.Indicator} fallback={<HeartIcon />}>
        <HeartIcon fill="currentColor" />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
