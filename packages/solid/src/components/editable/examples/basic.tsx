import { Editable } from '@ark-ui/solid/editable'
import { PencilIcon } from 'lucide-solid'
import styles from 'styles/editable.module.css'

export const Basic = () => (
  <Editable.Root class={styles.Root} placeholder="Enter text..." defaultValue="Hello World">
    <Editable.Label class={styles.Label}>Label</Editable.Label>
    <Editable.Area class={styles.Area}>
      <Editable.Input class={styles.Input} />
      <Editable.Preview class={styles.Preview} />
    </Editable.Area>
    <Editable.Control class={styles.Control}>
      <Editable.EditTrigger class={styles.EditTrigger}>
        <PencilIcon />
      </Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
)
