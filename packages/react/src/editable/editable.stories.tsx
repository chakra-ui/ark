import { Meta } from '@storybook/react'
import { useState } from 'react'
import { Editable } from './editable'
import { EditableArea } from './editable-area'
import { EditableInput } from './editable-input'
import { EditablePreview } from './editable-preview'

export default {
  title: 'React/Editable',
} as Meta

export const basic = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <p>Value: {value}</p>
      <Editable
        placeholder={{ preview: 'preview', edit: 'blub' }}
        value={value}
        onChange={({ value }) => setValue(value)}
      >
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
      </Editable>
    </>
  )
}
