import { Editable } from '@ark-ui/react/editable'
import styles from 'styles/editable.module.css'

export const DoubleClick = () => (
  <Editable.Root className={styles.Root} defaultValue="Double-click to edit" activationMode="dblclick">
    <Editable.Label className={styles.Label}>Label</Editable.Label>
    <Editable.Area className={styles.Area}>
      <Editable.Input className={styles.Input} />
      <Editable.Preview className={styles.Preview} />
    </Editable.Area>
  </Editable.Root>
)
