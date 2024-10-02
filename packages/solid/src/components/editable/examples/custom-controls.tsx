import { Editable } from '@ark-ui/solid/editable'
import { Show } from 'solid-js'

export const CustomControls = () => (
  <Editable.Root placeholder="enter a value" value="Chakra">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Context>
      {(editable) => (
        <Editable.Control>
          <Show
            when={editable().editing}
            fallback={<Editable.EditTrigger>Edit</Editable.EditTrigger>}
          >
            <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
            <Editable.CancelTrigger>Canvel</Editable.CancelTrigger>
          </Show>
        </Editable.Control>
      )}
    </Editable.Context>
  </Editable.Root>
)
