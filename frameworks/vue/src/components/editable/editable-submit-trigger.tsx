import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = defineComponent<EditableSubmitTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.button {...api.value.submitTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'EditableSubmitTrigger',
  },
)
