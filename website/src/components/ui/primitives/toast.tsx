'use client'
import type { Assign } from '@ark-ui/react'
import { Toast } from '@ark-ui/react/toast'
import { toast } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toast)

export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Toast.ActionTriggerProps>
>(Toast.Root, 'root')

export const ActionTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Toast.ActionTriggerProps>
>(Toast.ActionTrigger, 'actionTrigger')

export const CloseTrigger = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Toast.CloseTriggerProps>
>(Toast.CloseTrigger, 'closeTrigger')

export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Toast.DescriptionProps>
>(Toast.Description, 'description')

export const Title = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, Toast.TitleProps>>(
  Toast.Title,
  'title',
)

export {
  ToastContext as Context,
  Toaster,
  createToaster,
  type ToastContextProps as ContextProps,
  type ToasterProps,
} from '@ark-ui/react/toast'
