import { Editable } from '@ark-ui/solid/editable'
import { CheckIcon, PencilIcon, XIcon } from 'lucide-solid'
import { Show } from 'solid-js'
import styles from 'styles/editable.module.css'

export const Controls = () => (
  <Editable.Root class={styles.Root} defaultValue="Click edit to start">
    <Editable.Label class={styles.Label}>Label</Editable.Label>
    <Editable.Area class={styles.Area}>
      <Editable.Input class={styles.Input} />
      <Editable.Preview class={styles.Preview} />
    </Editable.Area>
    <Editable.Context>
      {(editable) => (
        <Editable.Control class={styles.Control}>
          <Show
            when={editable().editing}
            fallback={
              <Editable.EditTrigger class={styles.EditTrigger}>
                <PencilIcon />
              </Editable.EditTrigger>
            }
          >
            <Editable.SubmitTrigger class={styles.SubmitTrigger}>
              <CheckIcon />
            </Editable.SubmitTrigger>
            <Editable.CancelTrigger class={styles.CancelTrigger}>
              <XIcon />
            </Editable.CancelTrigger>
          </Show>
        </Editable.Control>
      )}
    </Editable.Context>
  </Editable.Root>
)
