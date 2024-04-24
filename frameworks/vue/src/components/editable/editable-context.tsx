import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseEditableContext, useEditableContext } from './use-editable-context'

export type EditableContextProps = SlotsType<{
  default: UnwrapRef<UseEditableContext>
}>

export const EditableContext = defineComponent(
  (_, { slots }) => {
    const editable = useEditableContext()

    return () => slots.default(editable.value)
  },
  {
    name: 'EditableContext',
    slots: Object as EditableContextProps,
  },
)
