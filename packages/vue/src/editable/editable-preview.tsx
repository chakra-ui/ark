import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview: ComponentWithProps<EditablePreviewProps> = defineComponent({
  name: 'EditablePreview',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.span {...api.value.previewProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})
