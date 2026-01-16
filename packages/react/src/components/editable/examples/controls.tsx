import { Editable } from '@ark-ui/react/editable'
import { CheckIcon, PencilIcon, XIcon } from 'lucide-react'
import styles from 'styles/editable.module.css'

export const Controls = () => (
  <Editable.Root className={styles.Root} defaultValue="Click edit to start">
    <Editable.Label className={styles.Label}>Label</Editable.Label>
    <Editable.Area className={styles.Area}>
      <Editable.Input className={styles.Input} />
      <Editable.Preview className={styles.Preview} />
    </Editable.Area>
    <Editable.Context>
      {(editable) => (
        <Editable.Control className={styles.Control}>
          {editable.editing ? (
            <>
              <Editable.SubmitTrigger className={styles.SubmitTrigger}>
                <CheckIcon />
              </Editable.SubmitTrigger>
              <Editable.CancelTrigger className={styles.CancelTrigger}>
                <XIcon />
              </Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger className={styles.EditTrigger}>
              <PencilIcon />
            </Editable.EditTrigger>
          )}
        </Editable.Control>
      )}
    </Editable.Context>
  </Editable.Root>
)
