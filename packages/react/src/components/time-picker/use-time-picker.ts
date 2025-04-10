import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as timePicker from '@zag-js/time-picker'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTimePickerProps extends Optional<Omit<timePicker.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTimePickerReturn extends timePicker.Api<PropTypes> {}

export const useTimePicker = (props?: UseTimePickerProps): UseTimePickerReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir, locale } = useLocaleContext()

  const machineProps: timePicker.Props = {
    id,
    dir,
    locale,
    getRootNode,
    ...props,
  }

  const service = useMachine(timePicker.machine, machineProps)
  return timePicker.connect(service, normalizeProps)
}
