import type { Meta } from 'storybook-solidjs'
import { Editable } from '../'

const meta: Meta = {
  title: 'Editable',
}

export default meta

export const Basic = () => (
  <Editable.Root placeholder="Placeholder" activationMode="dblclick">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
  </Editable.Root>
)

export const CustomControls = () => (
  <Editable.Root placeholder="enter a value" value="Chakra">
    {(api) => (
      <>
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          {api().isEditing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Canvel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      </>
    )}
  </Editable.Root>
)
