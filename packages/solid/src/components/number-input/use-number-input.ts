import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseNumberInputProps extends Optional<Omit<numberInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNumberInputReturn extends Accessor<numberInput.Api<PropTypes>> {}

export const useNumberInput = (props?: MaybeAccessor<UseNumberInputProps>): UseNumberInputReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<numberInput.Props>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      input: field?.().ids.control,
    },
    disabled: field?.().disabled,
    readOnly: field?.().readOnly,
    required: field?.().required,
    invalid: field?.().invalid,
    dir: locale().dir,
    locale: locale().locale,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(numberInput.machine, machineProps)
  return createMemo(() => numberInput.connect(service, normalizeProps))
}
