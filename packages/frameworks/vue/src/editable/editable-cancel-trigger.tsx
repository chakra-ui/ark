import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = defineComponent({
  name: 'EditableCancelTrigger',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.button {...api.value.cancelTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
