import { HoverCard } from '@ark-ui/react/src/hover-card'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { hoverCard } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(hoverCard)

export const Root = withProvider(HoverCard.Root)
export const Arrow = withContext(styled(HoverCard.Arrow), 'arrow')
export const ArrowTip = withContext(styled(HoverCard.ArrowTip), 'arrowTip')
export const Content = withContext(styled(HoverCard.Content), 'content')
export const Positioner = withContext(styled(HoverCard.Positioner), 'positioner')
export const Trigger = withContext(styled(HoverCard.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ArrowProps extends ComponentProps<typeof Arrow> {}
export interface ArrowTipProps extends ComponentProps<typeof ArrowTip> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
