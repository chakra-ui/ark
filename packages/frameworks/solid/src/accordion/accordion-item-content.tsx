import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const api = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const presenceApi = usePresenceContext()

  const mergedProps = mergeProps(
    () => api().getItemContentProps(accordionItem),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
