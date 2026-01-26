import { Toggle } from '@ark-ui/react/toggle'
import { HeartIcon } from 'lucide-react'
import styles from 'styles/toggle.module.css'

export const Indicator = () => {
  return (
    <Toggle.Root className={styles.Root}>
      <Toggle.Indicator className={styles.Indicator} fallback={<HeartIcon />}>
        <HeartIcon fill="currentColor" />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
