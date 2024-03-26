import { useFileUploadContext, type UseFileUploadContext } from './use-file-upload-context'

export interface FileUploadContextProps {
  children: (context: UseFileUploadContext) => React.ReactNode
}

export const FileUploadContext = (props: FileUploadContextProps) =>
  props.children(useFileUploadContext())
