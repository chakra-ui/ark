'use client'
import { Toast } from '@ark-ui/react/toast'
export { Toaster } from '@ark-ui/react/toast'

import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { toast } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(toast)

export const Root = withProvider(styled(Toast.Root), 'root')
export const CloseTrigger = withContext(styled(Toast.CloseTrigger), 'closeTrigger')
export const Description = withContext(styled(Toast.Description), 'description')
export const Title = withContext(styled(Toast.Title), 'title')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface CloseTriggerProps extends ComponentProps<typeof CloseTrigger> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
