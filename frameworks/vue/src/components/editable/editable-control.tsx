import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useEditableContext } from './editable-context'

export interface EditableControlProps extends HTMLArkProps<'div'> {}

export const EditableControl = defineComponent<EditableControlProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'EditableControl',
  },
)
