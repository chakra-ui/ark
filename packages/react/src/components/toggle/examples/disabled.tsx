import { Toggle } from '@ark-ui/react/toggle'
import { BoldIcon } from 'lucide-react'
import styles from 'styles/toggle.module.css'

export const Disabled = () => {
  return (
    <Toggle.Root className={styles.Root} disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
