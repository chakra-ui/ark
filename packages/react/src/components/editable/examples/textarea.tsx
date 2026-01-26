import { Editable } from '@ark-ui/react/editable'
import styles from 'styles/editable.module.css'

export const Textarea = () => (
  <Editable.Root
    className={styles.Root}
    placeholder="Enter a description..."
    defaultValue="Ark UI is a headless component library for building reusable, scalable design systems."
    activationMode="dblclick"
  >
    <Editable.Label className={styles.Label}>Description</Editable.Label>
    <Editable.Area className={styles.Area}>
      <Editable.Input className={styles.Textarea} asChild>
        <textarea />
      </Editable.Input>
      <Editable.Preview className={styles.Textarea} />
    </Editable.Area>
    <div className={styles.HelperText}>Press Cmd + Enter to save</div>
  </Editable.Root>
)
