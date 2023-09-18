import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useEditableContext } from './editable-context'

export type EditablePreviewProps = HTMLArkProps<'span'>

export const EditablePreview = defineComponent({
  name: 'EditablePreview',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()

    return () => (
      <ark.span {...api.value.previewProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.span>
    )
  },
})
