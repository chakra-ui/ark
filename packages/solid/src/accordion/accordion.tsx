import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionProps>

export const Accordion = (props: AccordionProps) => {
  const [accordionProps, divProps] = splitProps(props, [
    'collapsible',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'multiple',
    'onChange',
    'value',
  ])
  const accordion = useAccordion(accordionProps)

  return (
    <AccordionProvider value={accordion}>
      <ark.div {...accordion().rootProps} {...divProps} />
    </AccordionProvider>
  )
}
