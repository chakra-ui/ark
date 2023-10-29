import { FileUpload as FileUploadRoot, type FileUploadProps } from './file-upload'
import { useFileUploadContext, type FileUploadContext } from './file-upload-context'
import { FileUploadDropzone, type FileUploadDropzoneProps } from './file-upload-dropzone'
import { FileUploadItem, type FileUploadItemProps } from './file-upload-item'
import {
  FileUploadItemDeleteTrigger,
  type FileUploadItemDeleteTriggerProps,
} from './file-upload-item-delete-trigger'
import { FileUploadItemGroup, type FileUploadItemGroupProps } from './file-upload-item-group'
import { FileUploadItemName, type FileUploadItemNameProps } from './file-upload-item-name'
import { FileUploadItemPreview, type FileUploadItemPreviewProps } from './file-upload-item-preview'
import {
  FileUploadItemSizeText,
  type FileUploadItemSizeTextProps,
} from './file-upload-item-size-text'
import { FileUploadLabel, type FileUploadLabelProps } from './file-upload-label'
import { FileUploadTrigger, type FileUploadTriggerProps } from './file-upload-trigger'

const FileUpload = Object.assign(FileUploadRoot, {
  Root: FileUploadRoot,
  Dropzone: FileUploadDropzone,
  Label: FileUploadLabel,
  Trigger: FileUploadTrigger,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  ItemName: FileUploadItemName,
  ItemPreview: FileUploadItemPreview,
  ItemSizeText: FileUploadItemSizeText,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
})

export {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadTrigger,
  useFileUploadContext,
}

export type {
  FileUploadContext,
  FileUploadDropzoneProps,
  FileUploadItemDeleteTriggerProps,
  FileUploadItemGroupProps,
  FileUploadItemNameProps,
  FileUploadItemPreviewProps,
  FileUploadItemProps,
  FileUploadItemSizeTextProps,
  FileUploadLabelProps,
  FileUploadProps,
  FileUploadTriggerProps,
}
