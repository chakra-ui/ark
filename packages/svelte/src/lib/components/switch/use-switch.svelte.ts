import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as zagSwitch from '@zag-js/switch'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useFieldContext } from '../field'

export interface UseSwitchProps extends Optional<Omit<zagSwitch.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSwitchReturn extends Accessor<zagSwitch.Api<PropTypes>> {}

export const useSwitch = (props?: MaybeFunction<UseSwitchProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ids: {
        label: field?.().ids.label,
        hiddenInput: field?.().ids.control,
      },
      disabled: field?.().disabled,
      readOnly: field?.().readOnly,
      invalid: field?.().invalid,
      required: field?.().required,
      ...resolvedProps,
    }
  })

  const service = useMachine(zagSwitch.machine, () => machineProps)
  const api = $derived(zagSwitch.connect(service, normalizeProps))

  return () => api
}
