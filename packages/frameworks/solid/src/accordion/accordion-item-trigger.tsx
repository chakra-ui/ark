import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger: ArkComponent<'button'> = (props: AccordionItemTriggerProps) => {
  const api = useAccordionContext()
  const item = useAccordionItemContext()
  const presenceApi = usePresenceContext()

  const mergedProps = mergeProps(
    () => api().getItemTriggerProps(item),
    () => ({ 'aria-controls': presenceApi().isUnmounted && null }),
    props,
  )

  // @ts-expect-error we want aria-controls to be null to remove them if the popover if lazy mounted
  return <ark.button {...mergedProps} />
}
