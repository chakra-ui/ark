import * as editable from '@zag-js/editable'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseEditableProps
  extends Optional<Omit<editable.Context, 'dir' | 'getRootNode' | 'edit.controlled'>, 'id'> {
  /**
   * The initial edit state of the editable when it is first rendered.
   * Use when you do not need to control its edit state.
   */
  defaultEdit?: editable.Context['edit']
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: editable.Context['value']
}
export interface UseEditableReturn extends Accessor<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps) => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const field = useFieldContext()

  const context = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      input: field?.().ids.control,
    },
    dir: locale().dir,
    disabled: field?.().disabled,
    invalid: field?.().invalid,
    readOnly: field?.().readOnly,
    required: field?.().required,
    getRootNode: environment().getRootNode,
    edit: props.defaultEdit,
    value: props.defaultValue,
    'edit.controlled': props.edit !== undefined,
    ...props,
  }))
  const [state, send] = useMachine(editable.machine(context()), { context })

  return createMemo(() => editable.connect(state, send, normalizeProps))
}
