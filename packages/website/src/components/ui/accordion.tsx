import * as Ark from '@ark-ui/react/src/accordion'
import { styled } from 'styled-system/jsx'
import { accordion, type AccordionVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(accordion)

export * from '@ark-ui/react/src/accordion'
export type AccordionProps = Ark.AccordionRootProps & AccordionVariantProps

const AccordionRoot = withProvider(styled(Ark.Accordion.Root), 'root')
export const AccordionItem = withContext(styled(Ark.Accordion.Item), 'item')
export const AccordionItemContent = withContext(styled(Ark.Accordion.ItemContent), 'itemContent')
export const AccordionItemIndicator = withContext(
  styled(Ark.Accordion.ItemIndicator),
  'itemIndicator',
)
export const AccordionItemTrigger = withContext(styled(Ark.Accordion.ItemTrigger), 'itemTrigger')

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemContent: AccordionItemContent,
  ItemIndicator: AccordionItemIndicator,
  ItemTrigger: AccordionItemTrigger,
})
