import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as zagSwitch from '@zag-js/switch'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSwitchReturn extends zagSwitch.Api<PropTypes> {}

export const useSwitch = (props?: UseSwitchProps): UseSwitchReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: zagSwitch.Props = {
    id,
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    getRootNode,
    ...props,
  }

  const service = useMachine(zagSwitch.machine, machineProps)
  return zagSwitch.connect(service, normalizeProps)
}
