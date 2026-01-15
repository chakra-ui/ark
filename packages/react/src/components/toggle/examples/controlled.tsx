import { Toggle } from '@ark-ui/react/toggle'
import { HeartIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/toggle.module.css'

export const Controlled = () => {
  const [pressed, setPressed] = useState(false)
  return (
    <Toggle.Root className={styles.Root} pressed={pressed} onPressedChange={setPressed}>
      <Toggle.Indicator className={styles.Indicator} fallback={<HeartIcon />}>
        <HeartIcon fill="currentColor" />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
