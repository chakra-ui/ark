import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionProps>

export function Accordion(props: AccordionProps) {
  const [accordionProps, htmlProps] = splitProps(props, [
    'collapsible',
    'defaultValue',
    'dir',
    'disabled',
    'ids',
    'multiple',
    'onChange',
    'value',
  ])
  const accordion = useAccordion(accordionProps)

  return (
    <AccordionProvider value={accordion}>
      <ark.div {...accordion?.().rootProps} {...htmlProps} />
    </AccordionProvider>
  )
}
