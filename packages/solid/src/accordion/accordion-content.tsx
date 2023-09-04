import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import { AccordionItemPresence, type AccordionItemPresenceProps } from './accordion-item-presence'

export type AccordionContentProps = HTMLArkProps<'div'> & AccordionItemPresenceProps

export const AccordionContent = (props: AccordionContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useAccordionContext()
  const itemParams = useAccordionItemContext()
  const contentProps = mergeProps(() => api().getContentProps(itemParams), localProps)

  return (
    <AccordionItemPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </AccordionItemPresence>
  )
}
