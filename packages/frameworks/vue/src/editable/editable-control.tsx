import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl = defineComponent({
  name: 'EditableControl',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
