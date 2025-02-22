import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import type { PropTypes } from '@zag-js/types'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseEditableProps
  extends Optional<Omit<editable.Props, 'dir' | 'getRootNode' | 'edit.controlled'>, 'id'> {}

export interface UseEditableReturn extends editable.Api<PropTypes> {}

export const useEditable = (props: UseEditableProps = {}): UseEditableReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: editable.Props = {
    id,
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

    ...props,
  }

  const service = useMachine(editable.machine, machineProps)
  return editable.connect(service, normalizeProps)
}
