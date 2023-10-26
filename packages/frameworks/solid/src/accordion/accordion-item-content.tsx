import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const mergedProps = mergeProps(() => api().getItemContentProps(accordionItem), localProps)

  return (
    <Presence
      present={accordionItem.isOpen}
      {...presenceProps}
      fallback={<div {...api().getItemContentProps(accordionItem)} />}
    >
      <ark.div {...mergedProps} />
    </Presence>
  )
}
