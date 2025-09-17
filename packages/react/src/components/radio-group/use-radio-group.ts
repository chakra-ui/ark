import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (props?: UseRadioGroupProps): UseRadioGroupReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const machineProps: radio.Props = {
    id,
    ids: {
      label: field?.ids.label,
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    getRootNode,
    ...props,
  }

  const service = useMachine(radio.machine, machineProps)
  return radio.connect(service, normalizeProps)
}
