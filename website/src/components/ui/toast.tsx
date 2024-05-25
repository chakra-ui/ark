'use client'
import type { Assign } from '@ark-ui/react'
import { Toast } from '@ark-ui/react/toast'
import { type ToastVariantProps, toast } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toast)

export interface RootProps extends Assign<JsxStyleProps, Toast.RootProps>, ToastVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Toast.Root, 'root')

export const ActionTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Toast.ActionTriggerProps>
>(Toast.ActionTrigger, 'actionTrigger')

export const CloseTrigger = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Toast.CloseTriggerProps>
>(Toast.CloseTrigger, 'closeTrigger')

export const Description = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Toast.DescriptionProps>
>(Toast.Description, 'description')

export const Title = withContext<HTMLDivElement, Assign<JsxStyleProps, Toast.TitleProps>>(
  Toast.Title,
  'title',
)

export {
  createToaster,
  ToastContext as Context,
  Toaster,
  type ToastContextProps as ContextProps,
  type ToasterProps,
} from '@ark-ui/react/toast'
