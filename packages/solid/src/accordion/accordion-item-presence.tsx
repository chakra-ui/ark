import { Presence, type PresenceProps } from '../presence'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionItemPresenceProps = PresenceProps

export const AccordionItemPresence = (props: AccordionItemPresenceProps) => {
  const api = useAccordionItemContext()

  return <Presence present={api.isOpen} {...props} />
}
