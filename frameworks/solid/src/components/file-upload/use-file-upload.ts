import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseFileUploadProps
  extends Optional<Omit<fileUpload.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFileUploadReturn extends Accessor<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (props: UseFileUploadProps): UseFileUploadReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(fileUpload.machine(context()), { context })

  return createMemo(() => fileUpload.connect(state, send, normalizeProps))
}
