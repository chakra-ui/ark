import * as Ark from '@ark-ui/react/toast'
import { styled } from 'styled-system/jsx'
import { toast, type ToastVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toast)

export * from '@ark-ui/react/toast'
export const ToastProvider = withContext(styled(Ark.Toast.Provider))
export const ToastTitle = withContext(styled(Ark.Toast.Title), 'title')
export type ToastProps = Ark.ToastProps & ToastVariantProps

const ToastRoot = withProvider(styled(Ark.Toast.Root), 'root')
export const ToastDescription = withContext(styled(Ark.Toast.Description), 'description')
export const ToastCloseTrigger = withContext(styled(Ark.Toast.CloseTrigger), 'closeTrigger')
export const ToastPlacements = withContext(styled(Ark.Toast.Placements))
export const ToastGroup = withContext(styled(Ark.Toast.Group), 'group')

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Title: ToastTitle,
  Root: ToastRoot,
  Description: ToastDescription,
  CloseTrigger: ToastCloseTrigger,
  Placements: ToastPlacements,
  Group: ToastGroup,
})
