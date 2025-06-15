import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as signaturePad from '@zag-js/signature-pad'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useFieldContext } from '../field'

export interface UseSignaturePadProps extends Optional<Omit<signaturePad.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSignaturePadReturn extends Accessor<signaturePad.Api<PropTypes>> {}

export const useSignaturePad = (props?: MaybeFunction<UseSignaturePadProps>) => {
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
      required: field?.().required,
      ...resolvedProps,
    }
  })

  const service = useMachine(signaturePad.machine, () => machineProps)
  const api = $derived(signaturePad.connect(service, normalizeProps))

  return () => api
}
