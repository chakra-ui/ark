import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableEditTriggerProps extends HTMLArkProps<'button'> {}

export const EditableEditTrigger = defineComponent<EditableEditTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.button {...api.value.editTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'EditableEditTrigger',
  },
)
