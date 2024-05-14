'use client'
import { Tooltip } from '@ark-ui/react/tooltip'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { tooltip } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tooltip)

export const Root = withProvider(Tooltip.Root)
export const Arrow = withContext(styled(Tooltip.Arrow), 'arrow')
export const ArrowTip = withContext(styled(Tooltip.ArrowTip), 'arrowTip')
export const Content = withContext(styled(Tooltip.Content), 'content')
export const Positioner = withContext(styled(Tooltip.Positioner), 'positioner')
export const Trigger = withContext(styled(Tooltip.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ArrowProps extends ComponentProps<typeof Arrow> {}
export interface ArrowTipProps extends ComponentProps<typeof ArrowTip> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
