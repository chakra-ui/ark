import { mergeProps } from '@zag-js/solid'
import { useCollapsibleContext } from '../collapsible'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const context = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const collapsible = useCollapsibleContext()
  const triggerProps = context().getItemTriggerProps(itemProps)

  const mergedProps = mergeProps(
    () => context().getItemTriggerProps(itemProps),
    () => ({
      'aria-controls': collapsible().isUnmounted ? undefined : triggerProps['aria-controls'],
    }),
    props,
  )
  return <ark.button {...mergedProps} />
}
