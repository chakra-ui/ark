import type { Meta } from '@storybook/react'
import { Editable } from './'

type EditableType = typeof Editable

const meta: Meta<EditableType> = {
  title: 'Editable',
  component: Editable,
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
  <Editable.Root placeholder="enter a value" defaultValue="Chakra">
    {(api) => (
      <>
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          {api.isEditing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      </>
    )}
  </Editable.Root>
)
