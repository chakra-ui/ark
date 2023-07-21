import { Presence, type PresenceProps } from '../presence'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionItemPresenceProps = PresenceProps

export const AccordionItemPresence = (props: AccordionItemPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useAccordionItemContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
