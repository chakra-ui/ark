import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useEditableContext } from './editable-context'

export type EditableAreaProps = HTMLArkProps<'div'>

export const EditableArea = defineComponent({
  name: 'EditableArea',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.div {...api.value.areaProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
