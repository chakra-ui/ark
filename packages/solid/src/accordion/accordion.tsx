import { ParentProps } from 'solid-js'
import type { Context as ZagContext } from '@zag-js/accordion'
import { useAccordion } from './use-accordion'
import { AccordionContext } from './accordion-context'

type ClassNameProps = {
  class?: string
}

type AccordionProps = ParentProps<Omit<ZagContext, 'id'>> & ClassNameProps

export function Accordion(props: AccordionProps) {
  // TIL: destructing does not always work in solid
  // @see https://github.com/solidjs/solid/discussions/713#discussioncomment-1598197
  const api = useAccordion({ value: props.value, onChange: props.onChange })
  return (
    <AccordionContext.Provider value={api}>
      <div {...api?.().rootProps} class={props.class}>
        {props.children}
      </div>
    </AccordionContext.Provider>
  )
}
