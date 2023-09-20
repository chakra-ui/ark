import * as Ark from '@ark-ui/react/src/accordion'
import { styled } from 'styled-system/jsx'
import { accordion, type AccordionVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(accordion)

export * from '@ark-ui/react/src/accordion'
export type AccordionProps = Ark.AccordionProps & AccordionVariantProps

const AccordionRoot = withProvider(styled(Ark.Accordion.Root), 'root')
export const AccordionItem = withContext(styled(Ark.Accordion.Item), 'item')
export const AccordionItemContent = withContext(styled(Ark.Accordion.ItemContent), 'item')
export const AccordionItemTrigger = withContext(styled(Ark.Accordion.ItemTrigger), 'trigger')

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemContent: AccordionItemContent,
  ItemTrigger: AccordionItemTrigger,
})
