import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'

export interface AccordionDebugProps extends HTMLArkProps<'div'> {}

export const AccordionDebug = forwardRef<HTMLDivElement, AccordionDebugProps>((_, ref) => {
  const api = useAccordionContext()

  return (
    <ark.div ref={ref} data-scope="accordion" data-part="debug">
      <ark.pre dir="ltr">
        <ark.details open>
          <ark.summary>Accordion Debug</ark.summary>
          <ark.div>Value: {api.value}</ark.div>
        </ark.details>
      </ark.pre>
    </ark.div>
  )
})

AccordionDebug.displayName = 'AccordionDebug'
