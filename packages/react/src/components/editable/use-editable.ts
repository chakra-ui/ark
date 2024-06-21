import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import type { PropTypes } from '@zag-js/types'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'
import { useFieldContext } from '../field'

export interface UseEditableProps
  extends Optional<Omit<editable.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: editable.Context['value']
}

export interface UseEditableReturn extends editable.Api<PropTypes> {}

export const useEditable = (props: UseEditableProps = {}): UseEditableReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const initialContext: editable.Context = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      input: field?.ids.control,
    },
    dir,
    disabled: field?.disabled,
    invalid: field?.invalid,
    readOnly: field?.readOnly,
    required: field?.required,
    getRootNode,
    value: props.defaultValue,
    ...props,
  }

  const context: editable.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onEdit: useEvent(props.onEdit),
    onValueCommit: useEvent(props.onValueCommit),
    onValueRevert: useEvent(props.onValueRevert),
  }

  const [state, send] = useMachine(editable.machine(initialContext), { context })
  return editable.connect(state, send, normalizeProps)
}
