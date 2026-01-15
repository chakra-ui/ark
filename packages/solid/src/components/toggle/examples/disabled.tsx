import { Toggle } from '@ark-ui/solid/toggle'
import { BoldIcon } from 'lucide-solid'
import styles from 'styles/toggle.module.css'

export const Disabled = () => {
  return (
    <Toggle.Root class={styles.Root} disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
