import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as timePicker from '@zag-js/time-picker'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseTimePickerProps extends Optional<Omit<timePicker.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimePickerReturn extends Accessor<timePicker.Api<PropTypes>> {}

export const useTimePicker = (props?: MaybeAccessor<UseTimePickerProps>): UseTimePickerReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<timePicker.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    locale: locale().locale,
    ...runIfFn(props),
  }))

  const service = useMachine(timePicker.machine, machineProps)
  return createMemo(() => timePicker.connect(service, normalizeProps))
}
