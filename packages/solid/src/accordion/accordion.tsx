import { JSX, splitProps } from 'solid-js'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = UseAccordionProps & JSX.HTMLAttributes<HTMLDivElement>

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
      <div {...accordion?.().rootProps} {...htmlProps} />
    </AccordionProvider>
  )
}
