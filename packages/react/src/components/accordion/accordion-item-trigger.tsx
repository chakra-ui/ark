import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useCollapsibleContext } from '../collapsible'
import { type HTMLArkProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export type AccordionItemTriggerBaseProps = {}
export interface AccordionItemTriggerProps
  extends HTMLArkProps<'button'>,
    AccordionItemTriggerBaseProps {}

export const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  (props, ref) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const collapsible = useCollapsibleContext()
    const triggerProps = accordion.getItemTriggerProps(itemProps)
    const mergedProps = mergeProps(
      {
        ...triggerProps,
        'aria-controls': collapsible.isUnmounted ? undefined : triggerProps['aria-controls'],
      },
      props,
    )

    return <ark.button {...mergedProps} ref={ref} />
  },
)

AccordionItemTrigger.displayName = 'AccordionItemTrigger'
