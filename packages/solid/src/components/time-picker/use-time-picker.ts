import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as timePicker from '@zag-js/time-picker'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTimePickerProps extends Optional<Omit<timePicker.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimePickerReturn extends Accessor<timePicker.Api<PropTypes>> {}

export const useTimePicker = (props: UseTimePickerProps = {}): UseTimePickerReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<timePicker.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(timePicker.machine, machineProps)
  return createMemo(() => timePicker.connect(service, normalizeProps))
}
