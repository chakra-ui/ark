import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import { AccordionItemPresence, type AccordionItemPresenceProps } from './accordion-item-presence'

export type AccordionContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<AccordionItemPresenceProps, 'children'>

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent(props, ref) {
    const [presenceProps, accordionContentProps] = splitPresenceProps(props)
    return (
      <AccordionItemPresence {...presenceProps}>
        <InnerAccordionContent ref={ref} {...accordionContentProps} />
      </AccordionItemPresence>
    )
  },
)

const InnerAccordionContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  function InnerAccordionContent(props, ref) {
    const { getContentProps } = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const mergedProps = mergeProps(getContentProps(accordionItem), props)

    // TODO this works fine but not for lazy loaded content
    return (
      <ark.div {...mergedProps} ref={ref}>
        <div data-scope="accordion" data-part="inner-content">
          {props.children}
        </div>
      </ark.div>
    )
  },
)
