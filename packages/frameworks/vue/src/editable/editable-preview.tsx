import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useEditableContext } from './editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview = defineComponent({
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
