import { Dialog } from '@ark-ui/react/dialog'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { dialog } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(dialog)

export const Root = withProvider(Dialog.Root)
export const Backdrop = withContext(styled(Dialog.Backdrop), 'backdrop')
export const CloseTrigger = withContext(styled(Dialog.CloseTrigger), 'closeTrigger')
export const Content = withContext(styled(Dialog.Content), 'content')
export const Description = withContext(styled(Dialog.Description), 'description')
export const Positioner = withContext(styled(Dialog.Positioner), 'positioner')
export const Title = withContext(styled(Dialog.Title), 'title')
export const Trigger = withContext(styled(Dialog.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface BackdropProps extends ComponentProps<typeof Backdrop> {}
export interface CloseTriggerProps extends ComponentProps<typeof CloseTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
