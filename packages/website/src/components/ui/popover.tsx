import * as Ark from '@ark-ui/react/src/popover'
import { styled } from 'styled-system/jsx'
import { popover, type PopoverVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(popover)

export * from '@ark-ui/react/src/popover'
export type PopoverProps = Ark.PopoverRootProps & PopoverVariantProps

const PopoverRoot = withProvider(styled(Ark.Popover.Root))
export const PopoverAnchor = withContext(styled(Ark.Popover.Anchor), 'anchor')
export const PopoverArrow = withContext(styled(Ark.Popover.Arrow), 'arrow')
export const PopoverArrowTip = withContext(styled(Ark.Popover.ArrowTip), 'arrowTip')
export const PopoverCloseTrigger = withContext(styled(Ark.Popover.CloseTrigger), 'closeTrigger')
export const PopoverContent = withContext(styled(Ark.Popover.Content), 'content')
export const PopoverDescription = withContext(styled(Ark.Popover.Description), 'description')
export const PopoverPositioner = withContext(styled(Ark.Popover.Positioner), 'positioner')
export const PopoverTitle = withContext(styled(Ark.Popover.Title), 'title')
export const PopoverTrigger = withContext(styled(Ark.Popover.Trigger), 'trigger')

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Anchor: PopoverAnchor,
  Arrow: PopoverArrow,
  ArrowTip: PopoverArrowTip,
  CloseTrigger: PopoverCloseTrigger,
  Content: PopoverContent,
  Description: PopoverDescription,
  Positioner: PopoverPositioner,
  Title: PopoverTitle,
  Trigger: PopoverTrigger,
})
