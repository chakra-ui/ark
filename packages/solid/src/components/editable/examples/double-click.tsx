import { Editable } from '@ark-ui/solid/editable'
import styles from 'styles/editable.module.css'

export const DoubleClick = () => (
  <Editable.Root class={styles.Root} defaultValue="Double-click to edit" activationMode="dblclick">
    <Editable.Label class={styles.Label}>Label</Editable.Label>
    <Editable.Area class={styles.Area}>
      <Editable.Input class={styles.Input} />
      <Editable.Preview class={styles.Preview} />
    </Editable.Area>
  </Editable.Root>
)
