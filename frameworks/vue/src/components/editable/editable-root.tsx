import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { EditableProvider } from './editable-context'
import { emits, props } from './editable.props'
import { type UseEditableProps, useEditable } from './use-editable'

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
