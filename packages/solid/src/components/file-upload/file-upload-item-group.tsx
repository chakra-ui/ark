import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps<'ul'> {}
export interface FileUploadItemGroupProps
  extends JSX.HTMLAttributes<HTMLUListElement>,
    FileUploadItemGroupBaseProps {}

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getItemGroupProps(), props)

  return <ark.ul {...mergedProps} />
}
