import * as fileUpload from '@zag-js/file-upload'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseFileUploadProps extends Optional<fileUpload.Context, 'id'> {}
export interface UseFileUploadReturn extends fileUpload.Api<PropTypes> {}

export const useFileUpload = (props: UseFileUploadProps = {}): UseFileUploadReturn => {
  const initialContext: fileUpload.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
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
