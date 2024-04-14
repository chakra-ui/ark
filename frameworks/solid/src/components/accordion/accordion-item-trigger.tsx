import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import { useCollapsibleContext } from '../collapsible'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const context = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const collapsible = useCollapsibleContext()

  const mergedProps = mergeProps(() => context().getItemTriggerProps(itemProps), props)
  const [ariaControls, buttonProps] = splitProps(mergedProps, ['aria-controls'])

  return <ark.button {...buttonProps} {...(!collapsible().isUnmounted && ariaControls)} />
}
