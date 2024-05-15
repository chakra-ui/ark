'use client'
import { FileUpload } from '@ark-ui/react/file-upload'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { fileUpload } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(fileUpload)

export const Root = withProvider(styled(FileUpload.Root), 'root')
export const Dropzone = withContext(styled(FileUpload.Dropzone), 'dropzone')
export const Item = withContext(styled(FileUpload.Item), 'item')
export const ItemDeleteTrigger = withContext(
  styled(FileUpload.ItemDeleteTrigger),
  'itemDeleteTrigger',
)
export const ItemGroup = withContext(styled(FileUpload.ItemGroup), 'itemGroup')
export const ItemName = withContext(styled(FileUpload.ItemName), 'itemName')
export const ItemPreview = withContext(styled(FileUpload.ItemPreview), 'itemPreview')
export const ItemPreviewImage = withContext(styled(FileUpload.ItemPreviewImage), 'itemPreviewImage')
export const ItemSizeText = withContext(styled(FileUpload.ItemSizeText), 'itemSizeText')
export const Label = withContext(styled(FileUpload.Label), 'label')
export const Trigger = withContext(styled(FileUpload.Trigger), 'trigger')
export const HiddenInput = FileUpload.HiddenInput
export const Context = FileUpload.Context

export interface RootProps extends ComponentProps<typeof Root> {}
export interface DropzoneProps extends ComponentProps<typeof Dropzone> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemDeleteTriggerProps extends ComponentProps<typeof ItemDeleteTrigger> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemNameProps extends ComponentProps<typeof ItemName> {}
export interface ItemPreviewProps extends ComponentProps<typeof ItemPreview> {}
export interface ItemPreviewImageProps extends ComponentProps<typeof ItemPreviewImage> {}
export interface ItemSizeTextProps extends ComponentProps<typeof ItemSizeText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
