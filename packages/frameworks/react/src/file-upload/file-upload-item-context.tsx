import {
  useFileUploadItemContext,
  type UseFileUploadItemContext,
} from './use-file-upload-item-context'

export interface FileUploadItemContextProps {
  children: (context: UseFileUploadItemContext) => React.ReactNode
}

export const FileUploadItemContext = (props: FileUploadItemContextProps) =>
  props.children(useFileUploadItemContext())
