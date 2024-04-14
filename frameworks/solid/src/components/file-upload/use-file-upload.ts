import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseFileUploadProps extends Optional<fileUpload.Context, 'id'> {}
export interface UseFileUploadReturn extends Accessor<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (props: UseFileUploadProps): UseFileUploadReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(fileUpload.machine(context), { context })

  return createMemo(() => fileUpload.connect(state, send, normalizeProps))
}
