import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Accessor, Optional } from '../../types'
import { useFieldsetContext } from '../fieldset'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends Accessor<radio.Api<PropTypes>> {}

export const useRadioGroup = (props: MaybeFunction<UseRadioGroupProps>): UseRadioGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const fieldset = useFieldsetContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    const fieldsetContext = fieldset?.()

    return {
      ids: {
        label: fieldsetContext?.ids?.legend,
      },
      dir: locale().dir,
      disabled: fieldsetContext?.disabled,
      invalid: fieldsetContext?.invalid,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(radio.machine, () => resolvedProps)
  const api = $derived(radio.connect(service, normalizeProps))
  return () => api
}
