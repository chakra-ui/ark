import { Toggle } from '@ark-ui/react/toggle'
import { BoldIcon } from 'lucide-react'
import styles from 'styles/toggle.module.css'

export const Context = () => (
  <Toggle.Root className={styles.Root}>
    <BoldIcon />
    <Toggle.Context>{(context) => <span>{context.pressed ? 'On' : 'Off'}</span>}</Toggle.Context>
  </Toggle.Root>
)
