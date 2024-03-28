import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { EditableProvider } from './editable-context'
import { emits, props } from './editable.props'
import { useEditable, type UseEditableProps } from './use-editable'

export interface EditableRootProps extends Assign<HTMLArkProps<'div'>, UseEditableProps> {}

export const EditableRoot = defineComponent<EditableRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useEditable(props, emit)
    EditableProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'EditableRoot',
    props,
    emits,
  },
)
