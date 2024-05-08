'use client'

import { Dialog as ArkDrawer } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { drawer } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(drawer)

export const Root = withProvider(ArkDrawer.Root)
export const Backdrop = withContext(styled(ArkDrawer.Backdrop), 'backdrop')
export const Body = withContext(styled(ark.div), 'body')
export const CloseTrigger = withContext(styled(ArkDrawer.CloseTrigger), 'closeTrigger')
export const Content = withContext(styled(ArkDrawer.Content), 'content')
export const Description = withContext(styled(ArkDrawer.Description), 'description')
export const Footer = withContext(styled(ark.div), 'footer')
export const Header = withContext(styled(ark.div), 'header')
export const Positioner = withContext(styled(ArkDrawer.Positioner), 'positioner')
export const Title = withContext(styled(ArkDrawer.Title), 'title')
export const Trigger = withContext(styled(ArkDrawer.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface BackdropProps extends ComponentProps<typeof Backdrop> {}
export interface BodyProps extends ComponentProps<typeof Body> {}
export interface CloseTriggerProps extends ComponentProps<typeof CloseTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface FooterProps extends ComponentProps<typeof Footer> {}
export interface HeaderProps extends ComponentProps<typeof Header> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
