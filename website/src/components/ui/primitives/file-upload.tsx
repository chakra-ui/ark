'use client'
import type { Assign } from '@ark-ui/react'
import { FileUpload } from '@ark-ui/react/file-upload'
import { type FileUploadVariantProps, fileUpload } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(fileUpload)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, FileUpload.RootProviderBaseProps>, FileUploadVariantProps>
>(FileUpload.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, FileUpload.RootBaseProps>, FileUploadVariantProps>
>(FileUpload.Root, 'root')

export const Dropzone = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, FileUpload.DropzoneBaseProps>
>(FileUpload.Dropzone, 'dropzone')

export const ItemDeleteTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, FileUpload.ItemDeleteTriggerBaseProps>
>(FileUpload.ItemDeleteTrigger, 'itemDeleteTrigger')

export const ItemGroup = withContext<
  HTMLUListElement,
  Assign<HTMLStyledProps<'ul'>, FileUpload.ItemGroupBaseProps>
>(FileUpload.ItemGroup, 'itemGroup')

export const ItemName = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, FileUpload.ItemNameBaseProps>
>(FileUpload.ItemName, 'itemName')

export const ItemPreviewImage = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<'img'>, FileUpload.ItemPreviewImageBaseProps>
>(FileUpload.ItemPreviewImage, 'itemPreviewImage')

export const ItemPreview = withContext<
  HTMLImageElement,
  Assign<HTMLStyledProps<'div'>, FileUpload.ItemPreviewBaseProps>
>(FileUpload.ItemPreview, 'itemPreview')

export const Item = withContext<
  HTMLLIElement,
  Assign<HTMLStyledProps<'li'>, FileUpload.ItemBaseProps>
>(FileUpload.Item, 'item')

export const ItemSizeText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, FileUpload.ItemSizeTextBaseProps>
>(FileUpload.ItemSizeText, 'itemSizeText')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, FileUpload.LabelBaseProps>
>(FileUpload.Label, 'label')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, FileUpload.TriggerBaseProps>
>(FileUpload.Trigger, 'trigger')

export {
  FileUploadContext as Context,
  FileUploadHiddenInput as HiddenInput,
} from '@ark-ui/react/file-upload'
