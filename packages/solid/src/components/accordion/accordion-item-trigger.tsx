import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { useCollapsibleContext } from '../collapsible/index.tsx'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

export interface AccordionItemTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface AccordionItemTriggerProps extends HTMLProps<'button'>, AccordionItemTriggerBaseProps {}

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const collapsible = useCollapsibleContext()

  const mergedProps = mergeProps(() => accordion().getItemTriggerProps(itemProps), props)
  const [ariaControls, buttonProps] = splitProps(mergedProps, ['aria-controls'])

  return <ark.button {...buttonProps} {...(!collapsible().unmounted && ariaControls)} />
}
