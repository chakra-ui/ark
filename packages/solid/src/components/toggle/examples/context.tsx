import { Toggle } from '@ark-ui/solid/toggle'
import { BoldIcon } from 'lucide-solid'
import styles from 'styles/toggle.module.css'

export const Context = () => (
  <Toggle.Root class={styles.Root}>
    <BoldIcon />
    <Toggle.Context>{(context) => <span>{context().pressed ? 'On' : 'Off'}</span>}</Toggle.Context>
  </Toggle.Root>
)
