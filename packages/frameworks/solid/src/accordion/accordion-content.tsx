import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'> & PresenceProps

export const AccordionContent = (props: AccordionContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const contentProps = mergeProps(() => api().getContentProps(accordionItem), localProps)

  return (
    <Presence present={accordionItem.isOpen} {...presenceProps}>
      <ark.div {...contentProps} />
    </Presence>
  )
}
