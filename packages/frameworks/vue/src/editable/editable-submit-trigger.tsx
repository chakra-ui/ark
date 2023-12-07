import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableSubmitTriggerProps extends HTMLArkProps<'button'> {}

export const EditableSubmitTrigger = defineComponent({
  name: 'EditableSubmitTrigger',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.button {...api.value.submitTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
