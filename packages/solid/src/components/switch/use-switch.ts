import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as zagSwitch from '@zag-js/switch'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSwitchReturn extends Accessor<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props?: MaybeAccessor<UseSwitchProps>): UseSwitchReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<zagSwitch.Props>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    invalid: field?.().invalid,
    required: field?.().required,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(zagSwitch.machine, machineProps)
  return createMemo(() => zagSwitch.connect(service, normalizeProps))
}
