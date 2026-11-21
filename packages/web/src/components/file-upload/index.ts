import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/file-upload'
import type { ActionMethods, RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  FileUploadClearTrigger,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewImage,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadTrigger,
} from './parts.js'

export type { Api as FileUploadApi } from '@zag-js/file-upload'
export interface FileUploadElement
  extends
    ActionMethods<Api, 'clearFiles' | 'openFilePicker'>,
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations' | 'acceptedFiles' | 'defaultAcceptedFiles'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-file-upload': FileUploadElement
    'ark-file-upload-dropzone': InstanceType<typeof FileUploadDropzone>
    'ark-file-upload-trigger': InstanceType<typeof FileUploadTrigger>
    'ark-file-upload-clear-trigger': InstanceType<typeof FileUploadClearTrigger>
    'ark-file-upload-hidden-input': InstanceType<typeof FileUploadHiddenInput>
    'ark-file-upload-item-group': InstanceType<typeof FileUploadItemGroup>
    'ark-file-upload-item': InstanceType<typeof FileUploadItem>
    'ark-file-upload-item-name': InstanceType<typeof FileUploadItemName>
    'ark-file-upload-item-size-text': InstanceType<typeof FileUploadItemSizeText>
    'ark-file-upload-item-preview': InstanceType<typeof FileUploadItemPreview>
    'ark-file-upload-item-preview-image': InstanceType<typeof FileUploadItemPreviewImage>
    'ark-file-upload-item-delete-trigger': InstanceType<typeof FileUploadItemDeleteTrigger>
    'ark-file-upload-label': InstanceType<typeof FileUploadLabel>
  }
}

export type FileUploadEventMap = CallbackEvents<Props>
