import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './editable.props'
import { type UseEditableProps, useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

export interface EditableRootProps extends Assign<HTMLArkProps<'div'>, UseEditableProps> {}

export const EditableRoot = defineComponent<EditableRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useEditable(props, emit)
    EditableProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'EditableRoot',
    props,
    emits,
  },
)
