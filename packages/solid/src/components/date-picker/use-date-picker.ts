import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseDatePickerProps extends Optional<Omit<datePicker.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseDatePickerReturn extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props?: MaybeAccessor<UseDatePickerProps>): UseDatePickerReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<datePicker.Props>(() => ({
    id,
    dir: locale().dir,
    locale: locale().locale,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(datePicker.machine, machineProps)
  return createMemo(() => datePicker.connect(service, normalizeProps))
}
