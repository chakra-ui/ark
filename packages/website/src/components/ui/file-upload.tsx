import * as Ark from '@ark-ui/react/src/carousel'
import { styled } from 'styled-system/jsx'
import { fileUpload, type FileUploadVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(fileUpload)

export * from '@ark-ui/react/src/file-upload'
export type FileUploadProps = Ark.FileUploadProps & FileUploadVariantProps

const FileUploadRoot = withProvider(styled(Ark.FileUpload.Root), 'root')
export const FileUploadDropzone = withContext(styled(Ark.FileUpload.Dropzone), 'dropzone')
export const FileUploadLabel = withContext(styled(Ark.FileUpload.Label), 'label')
export const FileUploadTrigger = withContext(styled(Ark.FileUpload.Trigger), 'trigger')
export const FileUploadItem = withContext(styled(Ark.FileUpload.Item), 'item')
export const FileUploadItemGroup = withContext(styled(Ark.FileUpload.ItemGroup), 'itemGroup')
export const FileUploadItemName = withContext(styled(Ark.FileUpload.ItemName), 'itemName')
export const FileUploadItemPreview = withContext(styled(Ark.FileUpload.ItemPreview), 'itemPreview')
export const FileUploadItemSizeText = withContext(
  styled(Ark.FileUpload.ItemSizeText),
  'itemSizeText',
)
export const FileUploadItemDeleteTrigger = withContext(
  styled(Ark.FileUpload.ItemDeleteTrigger),
  'itemDeleteTrigger',
)

export const FileUpload = Object.assign(FileUploadRoot, {
  Root: FileUploadRoot,
  Dropzone: FileUploadDropzone,
  Label: FileUploadLabel,
  Trigger: FileUploadTrigger,
  Item: FileUploadItem,
  ItemGroup: FileUploadItemGroup,
  ItemName: FileUploadItemName,
  ItemPreview: FileUploadItemPreview,
  ItemSizeText: FileUploadItemSizeText,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
})
