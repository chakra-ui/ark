import * as Ark from '@ark-ui/react/src/toast'
import { styled } from 'styled-system/jsx'
import { toast, type ToastVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toast)

export * from '@ark-ui/react/src/toast'
export type ToastProps = Ark.ToastRootProps & ToastVariantProps

const ToastRoot = withProvider(styled(Ark.Toast.Root), 'root')
export const ToastTitle = withContext(styled(Ark.Toast.Title), 'title')
export const ToastDescription = withContext(styled(Ark.Toast.Description), 'description')
export const ToastCloseTrigger = withContext(styled(Ark.Toast.CloseTrigger), 'closeTrigger')

export const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  CloseTrigger: ToastCloseTrigger,
})
