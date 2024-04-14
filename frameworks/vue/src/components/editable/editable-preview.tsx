import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useEditableContext } from './editable-context'

export interface EditablePreviewProps extends HTMLArkProps<'span'> {}

export const EditablePreview = defineComponent<EditablePreviewProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.span {...api.value.previewProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'EditablePreview',
  },
)
