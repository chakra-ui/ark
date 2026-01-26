import { Editable } from '@ark-ui/solid/editable'
import { PencilIcon } from 'lucide-solid'
import { Show } from 'solid-js'
import styles from 'styles/editable.module.css'

export const Context = () => (
  <Editable.Root class={styles.Root} placeholder="Enter text..." defaultValue="Hello World">
    <Editable.Label class={styles.Label}>Label</Editable.Label>
    <Editable.Area class={styles.Area}>
      <Editable.Input class={styles.Input} />
      <Editable.Preview class={styles.Preview} />
    </Editable.Area>
    <Editable.Context>
      {(editable) => (
        <Show
          when={editable().editing}
          fallback={
            <Editable.Control class={styles.Control}>
              <Editable.EditTrigger class={styles.EditTrigger}>
                <PencilIcon />
              </Editable.EditTrigger>
            </Editable.Control>
          }
        >
          <span class={styles.HelperText}>Enter to save, Esc to cancel</span>
        </Show>
      )}
    </Editable.Context>
  </Editable.Root>
)
