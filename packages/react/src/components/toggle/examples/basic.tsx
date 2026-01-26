import { Toggle } from '@ark-ui/react/toggle'
import { BoldIcon } from 'lucide-react'
import styles from 'styles/toggle.module.css'

export const Basic = () => {
  return (
    <Toggle.Root className={styles.Root}>
      <BoldIcon />
    </Toggle.Root>
  )
}
