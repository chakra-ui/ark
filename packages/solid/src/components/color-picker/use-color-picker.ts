import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseColorPickerProps extends Optional<Omit<colorPicker.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseColorPickerReturn extends Accessor<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (props?: MaybeAccessor<UseColorPickerProps>): UseColorPickerReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<colorPicker.Props>(() => ({
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
    ...runIfFn(props),
  }))

  const service = useMachine(colorPicker.machine, machineProps)
  return createMemo(() => colorPicker.connect(service, normalizeProps))
}
