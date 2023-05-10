import type { Meta } from 'storybook-solidjs'
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
} from '.'
import { useEditable } from './use-editable'

const meta: Meta = {
  title: 'Editable',
}

export default meta

export const Hook = () => {
  const api = useEditable({ placeholder: 'Enter' })
  return (
    <div {...api().rootProps}>
      <div {...api().areaProps}>
        <input {...api().inputProps} />
        <span {...api().previewProps} />
      </div>
      {api().isEditing ? (
        <>
          <button {...api().submitTriggerProps}>Save</button>
          <button {...api().cancelTriggerProps}>Cancel</button>
        </>
      ) : (
        <button {...api().editTriggerProps}>Edit</button>
      )}
    </div>
  )
}

export const Basic = () => (
  <Editable placeholder="Enter">
    {(api) => (
      <>
        <EditableLabel>Label</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControl>
          {api().isEditing ? (
            <>
              <EditableSubmitTrigger>Save</EditableSubmitTrigger>
              <EditableCancelTrigger>Canvel</EditableCancelTrigger>
            </>
          ) : (
            <EditableEditTrigger>Edit</EditableEditTrigger>
          )}
        </EditableControl>
      </>
    )}
  </Editable>
)
