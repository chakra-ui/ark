import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useEditableContext } from './editable-context'

export interface EditableLabelProps extends HTMLArkProps<'label'> {}

export const EditableLabel = defineComponent<EditableLabelProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'EditableLabel',
  },
)
