import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Accessor, Optional } from '../../types'

export interface UseRadioGroupProps extends Optional<Omit<radio.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRadioGroupReturn extends Accessor<radio.Api<PropTypes>> {}

export const useRadioGroup = (props: MaybeFunction<UseRadioGroupProps>): UseRadioGroupReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(radio.machine, () => resolvedProps)
  const api = $derived(radio.connect(service, normalizeProps))
  return () => api
}
