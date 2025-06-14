import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseFileUploadProps extends Optional<Omit<fileUpload.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFileUploadReturn extends Accessor<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (props?: MaybeFunction<UseFileUploadProps>): UseFileUploadReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      locale: locale().locale,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(fileUpload.machine, () => machineProps)
  const api = $derived(fileUpload.connect(service, normalizeProps))
  return () => api
}
