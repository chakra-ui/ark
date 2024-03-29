import { Popover } from '@ark-ui/react/popover'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { popover } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(popover)

export const Root = withProvider(Popover.Root)
export const Anchor = withContext(styled(Popover.Anchor), 'anchor')
export const Arrow = withContext(styled(Popover.Arrow), 'arrow')
export const ArrowTip = withContext(styled(Popover.ArrowTip), 'arrowTip')
export const CloseTrigger = withContext(styled(Popover.CloseTrigger), 'closeTrigger')
export const Content = withContext(styled(Popover.Content), 'content')
export const Description = withContext(styled(Popover.Description), 'description')
export const Indicator = withContext(styled(Popover.Indicator), 'indicator')
export const Positioner = withContext(styled(Popover.Positioner), 'positioner')
export const Title = withContext(styled(Popover.Title), 'title')
export const Trigger = withContext(styled(Popover.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface AnchorProps extends ComponentProps<typeof Anchor> {}
export interface ArrowProps extends ComponentProps<typeof Arrow> {}
export interface ArrowTipProps extends ComponentProps<typeof ArrowTip> {}
export interface CloseTriggerProps extends ComponentProps<typeof CloseTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface DescriptionProps extends ComponentProps<typeof Description> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TitleProps extends ComponentProps<typeof Title> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
