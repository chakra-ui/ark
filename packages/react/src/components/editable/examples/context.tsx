import { Editable } from '@ark-ui/react/editable'
import { PencilIcon } from 'lucide-react'
import styles from 'styles/editable.module.css'

export const Context = () => (
  <Editable.Root className={styles.Root} placeholder="Enter text..." defaultValue="Hello World">
    <Editable.Label className={styles.Label}>Label</Editable.Label>
    <Editable.Area className={styles.Area}>
      <Editable.Input className={styles.Input} />
      <Editable.Preview className={styles.Preview} />
    </Editable.Area>
    <Editable.Context>
      {(editable) =>
        editable.editing ? (
          <span className={styles.HelperText}>Enter to save, Esc to cancel</span>
        ) : (
          <Editable.Control className={styles.Control}>
            <Editable.EditTrigger className={styles.EditTrigger}>
              <PencilIcon />
            </Editable.EditTrigger>
          </Editable.Control>
        )
      }
    </Editable.Context>
  </Editable.Root>
)
