import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseFileUploadProps extends Optional<fileUpload.Context, 'id'> {}

export interface UseFileUploadReturn extends ComputedRef<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (
  props: UseFileUploadProps,
  emit: CallableFunction,
): UseFileUploadReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    fileUpload.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFileChange: (details) => {
        emit('file-change', details)
      },
      onFileAccept: (details) => {
        emit('file-accept', details)
      },
      onFileReject(details) {
        emit('file-reject', details)
      },
    }),
    { context },
  )

  return computed(() => fileUpload.connect(state.value, send, normalizeProps))
}
