import * as Ark from '@ark-ui/react/src/toast'
import { styled } from 'styled-system/jsx'
import { toast, type ToastVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

export * from '@ark-ui/react/src/toast'
export type ToastProps = Ark.ToastProps & ToastVariantProps

const { withProvider, withContext } = createStyleContext(toast)

const ToastRoot = withProvider(Ark.Toast.Root, 'root')
export const ToastCloseTrigger = withContext(styled(Ark.Toast.CloseTrigger), 'closeTrigger')
export const ToastDescription = withContext(styled(Ark.Toast.Description), 'description')
export const ToastTitle = withContext(styled(Ark.Toast.Title), 'title')

export const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  CloseTrigger: ToastCloseTrigger,
  Description: ToastDescription,
  Title: ToastTitle,
})
