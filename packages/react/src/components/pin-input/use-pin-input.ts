import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UsePinInputProps extends Optional<Omit<pinInput.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePinInputReturn extends pinInput.Api<PropTypes> {}

export const usePinInput = (props: UsePinInputProps = {}): UsePinInputReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const userProps: pinInput.Props = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    invalid: field?.invalid,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(pinInput.machine, userProps)
  return pinInput.connect(service, normalizeProps)
}
