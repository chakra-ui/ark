import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseFileUploadProps
  extends Optional<Omit<fileUpload.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFileUploadReturn extends fileUpload.Api<PropTypes> {}

export const useFileUpload = (props: UseFileUploadProps = {}): UseFileUploadReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: fileUpload.Context = {
    id: useId(),
    dir,
    getRootNode,
    ...props,
  }

  const context: fileUpload.Context = {
    ...initialContext,
    onFileAccept: useEvent(props.onFileAccept),
    onFileReject: useEvent(props.onFileReject),
    onFileChange: useEvent(props.onFileChange, { sync: true }),
  }

  const [state, send] = useMachine(fileUpload.machine(initialContext), { context })
  return fileUpload.connect(state, send, normalizeProps)
}
