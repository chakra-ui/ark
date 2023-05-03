import type { Meta } from '@storybook/react'
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from './'

type EditableType = typeof Editable

const meta: Meta<EditableType> = {
  title: 'Editable',
  component: Editable,
}

export default meta

export const Basic = () => (
  <Editable placeholder="Placeholder" activationMode="dblclick">
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
  </Editable>
)

export const CustomControls = () => (
  <Editable activationMode="dblclick" placeholder="enter a value" defaultValue="Chakra">
    {(state) => (
      <>
        <EditableLabel>Label</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControl>
          {state.isEditing ? (
            <>
              <EditableSubmitTrigger>
                <button>Save</button>
              </EditableSubmitTrigger>
              <EditableCancelTrigger>
                <button>Cancel</button>
              </EditableCancelTrigger>
            </>
          ) : (
            <EditableEditTrigger>
              <button>Edit</button>
            </EditableEditTrigger>
          )}
        </EditableControl>
      </>
    )}
  </Editable>
)
