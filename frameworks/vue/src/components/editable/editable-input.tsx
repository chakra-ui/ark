import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
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
