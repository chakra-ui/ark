import { useEnvironmentContext, useLocaleContext } from '$lib/providers'
import type { Accessor, Optional } from '$lib/types'
import { runIfFn } from '$lib/utils/run-if-fn'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as tagsInput from '@zag-js/tags-input'
import { type MaybeFunction, ensureProps } from '@zag-js/utils'
import { useFieldContext } from '../field'

export interface UseTagsInputProps extends Optional<Omit<tagsInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTagsInputReturn extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (inProps: MaybeFunction<UseTagsInputProps> = {}): UseTagsInputReturn => {
  const props = $derived.by<UseTagsInputProps>(() => {
    const resolvedProps = runIfFn(inProps)
    ensureProps(resolvedProps, ['id'])
    return resolvedProps
  })

  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const field = useFieldContext()

  const machineProps = $derived<UseTagsInputProps>({
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    // @ts-expect-error - TODO: dir is not a valid prop
    dir: locale().dir,
    disabled: field?.().disabled,
    invalid: field?.().invalid,
    readOnly: field?.().readOnly,
    required: field?.().required,
    getRootNode: env().getRootNode,
    ...props,
  })

  const service = useMachine(tagsInput.machine, () => machineProps)
  const api = $derived(tagsInput.connect(service, normalizeProps))

  return () => api
}
