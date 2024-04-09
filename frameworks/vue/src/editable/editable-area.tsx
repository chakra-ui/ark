import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditableAreaProps extends HTMLArkProps<'div'> {}

export const EditableArea = defineComponent<EditableAreaProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.div {...api.value.areaProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'EditableArea',
  },
)
