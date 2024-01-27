import * as Ark from '@ark-ui/react/src/hover-card'
import { styled } from 'styled-system/jsx'
import { hoverCard, type HoverCardVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(hoverCard)

export * from '@ark-ui/react/src/hover-card'
export type HoverCardProps = Ark.HoverCardRootProps & HoverCardVariantProps

const HoverCardRoot = withProvider(styled(Ark.HoverCard.Root))
export const HoverCardArrow = withContext(styled(Ark.HoverCard.Arrow), 'arrow')
export const HoverCardArrowTip = withContext(styled(Ark.HoverCard.ArrowTip), 'arrowTip')
export const HoverCardContent = withContext(styled(Ark.HoverCard.Content), 'content')
export const HoverCardPositioner = withContext(styled(Ark.HoverCard.Positioner), 'positioner')
export const HoverCardTrigger = withContext(styled(Ark.HoverCard.Trigger), 'trigger')

export const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  Arrow: HoverCardArrow,
  ArrowTip: HoverCardArrowTip,
  Content: HoverCardContent,
  Positioner: HoverCardPositioner,
  Trigger: HoverCardTrigger,
})
