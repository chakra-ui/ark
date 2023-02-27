import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useEditableContext } from './editable-context'

export type EditableControlProps = HTMLArkProps<'div'>

export const EditableControl: ComponentWithProps<EditableControlProps> = defineComponent({
  name: 'EditableControl',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
