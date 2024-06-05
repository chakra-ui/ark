import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './file-upload'

export interface UseFileUploadProps
  extends Optional<Omit<fileUpload.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseFileUploadReturn extends ComputedRef<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (
  props: UseFileUploadProps,
  emit?: EmitFn<RootEmits>,
): UseFileUploadReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<fileUpload.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onFileChange: (details) => emit?.('fileChange', details),
    onFileAccept: (details) => emit?.('fileAccept', details),
    onFileReject: (details) => emit?.('fileReject', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(fileUpload.machine(context.value), { context })

  return computed(() => fileUpload.connect(state.value, send, normalizeProps))
}
