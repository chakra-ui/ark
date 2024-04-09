import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableInputProps extends HTMLArkProps<'input'> {}

export const EditableInput = defineComponent<EditableInputProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.input {...api.value.inputProps} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
  {
    name: 'EditableInput',
  },
)
