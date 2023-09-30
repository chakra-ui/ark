import type { Meta } from 'storybook-solidjs'
import { Editable } from './'
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
  <Editable.Root placeholder="Enter">
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
