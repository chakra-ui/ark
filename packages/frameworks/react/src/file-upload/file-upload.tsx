import type { FileAcceptDetails, FileChangeDetails, FileRejectDetails } from '@zag-js/file-upload'
import {
  FileUploadDropzone as Dropzone,
  type FileUploadDropzoneProps as DropzoneProps,
} from './file-upload-dropzone'
import { FileUploadItem as Item, type FileUploadItemProps as ItemProps } from './file-upload-item'
import {
  FileUploadItemDeleteTrigger as ItemDeleteTrigger,
  type FileUploadItemDeleteTriggerProps as ItemDeleteTriggerProps,
} from './file-upload-item-delete-trigger'
import {
  FileUploadItemGroup as ItemGroup,
  type FileUploadItemGroupProps as ItemGroupProps,
} from './file-upload-item-group'
import {
  FileUploadItemName as ItemName,
  type FileUploadItemNameProps as ItemNameProps,
} from './file-upload-item-name'
import {
  FileUploadItemPreview as ItemPreview,
  type FileUploadItemPreviewProps as ItemPreviewProps,
} from './file-upload-item-preview'
import {
  FileUploadItemPreviewImage as ItemPreviewImage,
  type FileUploadItemPreviewImageProps as ItemPreviewImageProps,
} from './file-upload-item-preview-image'
import {
  FileUploadItemSizeText as ItemSizeText,
  type FileUploadItemSizeTextProps as ItemSizeTextProps,
} from './file-upload-item-size-text'
import {
  FileUploadLabel as Label,
  type FileUploadLabelProps as LabelProps,
} from './file-upload-label'
import { FileUploadRoot as Root, type FileUploadRootProps as RootProps } from './file-upload-root'
import {
  FileUploadTrigger as Trigger,
  type FileUploadTriggerProps as TriggerProps,
} from './file-upload-trigger'

export {
  Dropzone,
  Item,
  ItemDeleteTrigger,
  ItemGroup,
  ItemName,
  ItemPreview,
  ItemPreviewImage,
  ItemSizeText,
  Label,
  Root,
  Trigger,
}
export type {
  DropzoneProps,
  FileAcceptDetails,
  FileChangeDetails,
  FileRejectDetails,
  ItemDeleteTriggerProps,
  ItemGroupProps,
  ItemNameProps,
  ItemPreviewImageProps,
  ItemPreviewProps,
  ItemProps,
  ItemSizeTextProps,
  LabelProps,
  RootProps,
  TriggerProps,
}
