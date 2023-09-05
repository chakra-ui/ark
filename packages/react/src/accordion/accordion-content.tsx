import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<PresenceProps, 'children'>

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent(props, ref) {
    const [presenceProps, localProps] = splitPresenceProps(props)
    const api = useAccordionItemContext()

    return (
      <Presence present={api.isOpen} {...presenceProps}>
        <AccordionInnerContent ref={ref} {...localProps} />
      </Presence>
    )
  },
)

const AccordionInnerContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  function AccordionInnerContent(props, ref) {
    const api = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const mergedProps = mergeProps(api.getContentProps(accordionItem), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
