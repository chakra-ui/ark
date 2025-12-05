import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldsetContext } from '../fieldset'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends Accessor<radio.Api<PropTypes>> {}

export const useRadioGroup = (props?: MaybeAccessor<UseRadioGroupProps>): UseRadioGroupReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const fieldset = useFieldsetContext()

  const machineProps = createMemo(() => {
    const fieldsetContext = fieldset?.()

    return {
      id,
      ids: {
        label: fieldsetContext?.ids?.legend,
      },
      dir: locale().dir,
      disabled: fieldsetContext?.disabled,
      invalid: fieldsetContext?.invalid,
      getRootNode: environment().getRootNode,
      ...runIfFn(props),
    }
  })

  const service = useMachine(radio.machine, machineProps)
  return createMemo(() => radio.connect(service, normalizeProps))
}
