import * as Ark from '@ark-ui/react/tooltip'
import { styled } from 'styled-system/jsx'
import { tooltip, type TooltipVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tooltip)

export * from '@ark-ui/react/tooltip'
export type TooltipProps = Ark.TooltipProps & TooltipVariantProps

const TooltipRoot = withProvider(styled(Ark.Tooltip.Root))
export const TooltipArrow = withContext(styled(Ark.Tooltip.Arrow), 'arrow')
export const TooltipArrowTip = withContext(styled(Ark.Tooltip.ArrowTip), 'arrowTip')
export const TooltipContent = withContext(styled(Ark.Tooltip.Content), 'content')
export const TooltipPositioner = withContext(styled(Ark.Tooltip.Positioner), 'positioner')
export const TooltipTrigger = withContext(styled(Ark.Tooltip.Trigger), 'trigger')

export const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
  Content: TooltipContent,
  Positioner: TooltipPositioner,
  Trigger: TooltipTrigger,
})
