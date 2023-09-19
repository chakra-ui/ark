import * as Ark from '@ark-ui/react/accordion'
import { styled } from 'styled-system/jsx'
import { accordion, type AccordionVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(accordion)

export * from '@ark-ui/react/accordion'
export type AccordionProps = Ark.AccordionProps & AccordionVariantProps

const AccordionRoot = withProvider(styled(Ark.Accordion.Root), 'root')
export const AccordionContent = withContext(styled(Ark.Accordion.Content), 'content')
export const AccordionItem = withContext(styled(Ark.Accordion.Item), 'item')
export const AccordionTrigger = withContext(styled(Ark.Accordion.Trigger), 'trigger')

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})
