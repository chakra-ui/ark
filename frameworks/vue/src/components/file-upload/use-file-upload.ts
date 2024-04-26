import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './file-upload'

export interface UseFileUploadProps
  extends Optional<Omit<fileUpload.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseFileUploadReturn extends ComputedRef<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (
  props: UseFileUploadProps,
  emit: EmitFn<RootEmits>,
): UseFileUploadReturn => {
  const env = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    fileUpload.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onFileChange: (details) => {
        emit('fileChange', details)
      },
      onFileAccept: (details) => {
        emit('fileAccept', details)
      },
      onFileReject(details) {
        emit('fileReject', details)
      },
    }),
    { context },
  )

  return computed(() => fileUpload.connect(state.value, send, normalizeProps))
}
