import { Toggle } from '@ark-ui/solid/toggle'
import { HeartIcon } from 'lucide-solid'
import styles from 'styles/toggle.module.css'

export const Indicator = () => {
  return (
    <Toggle.Root class={styles.Root}>
      <Toggle.Indicator class={styles.Indicator} fallback={<HeartIcon />}>
        <HeartIcon fill="currentColor" />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
