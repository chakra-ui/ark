import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const api = useAccordionContext()
  const item = useAccordionItemContext()
  const presenceApi = usePresenceContext()

  const mergedProps = mergeProps(
    () => api().getItemTriggerProps(item),
    () => ({ 'aria-controls': presenceApi().isUnmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}
