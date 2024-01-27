import { Tooltip as ArkTooltip, type TooltipRootProps } from '@ark-ui/react/src/tooltip'
import { styled } from 'styled-system/jsx'
import { tooltip, type TooltipVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tooltip)

export * from '@ark-ui/react/src/tooltip'
export type TooltipProps = TooltipRootProps & TooltipVariantProps

const TooltipRoot = withProvider(styled(ArkTooltip.Root))
export const TooltipArrow = withContext(styled(ArkTooltip.Arrow), 'arrow')
export const TooltipArrowTip = withContext(styled(ArkTooltip.ArrowTip), 'arrowTip')
export const TooltipContent = withContext(styled(ArkTooltip.Content), 'content')
export const TooltipPositioner = withContext(styled(ArkTooltip.Positioner), 'positioner')
export const TooltipTrigger = withContext(styled(ArkTooltip.Trigger), 'trigger')

export const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
  Content: TooltipContent,
  Positioner: TooltipPositioner,
  Trigger: TooltipTrigger,
})
