import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import { AccordionItemPresence, type AccordionItemPresenceProps } from './accordion-item-presence'

export type AccordionContentProps = HTMLArkProps<'div'> &
  Omit<AccordionItemPresenceProps, 'children'>

export const AccordionContent = forwardRef<'div', AccordionContentProps>((props, ref) => {
  const [presenceProps, accordionContentProps] = splitPresenceProps(props)
  return (
    <AccordionItemPresence {...presenceProps}>
      <InnerAccordionContent ref={ref} {...accordionContentProps} />
    </AccordionItemPresence>
  )
})

const InnerAccordionContent = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { getContentProps } = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const mergedProps = mergeProps(getContentProps(accordionItem), props)

  return <ark.div {...mergedProps} ref={ref} />
})
