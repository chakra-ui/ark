import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useCollapsibleContext } from '../collapsible'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  (props, ref) => {
    const context = useAccordionContext()
    const itemContext = useAccordionItemContext()
    const collapsible = useCollapsibleContext()
    const triggerProps = context.getItemTriggerProps(itemContext)
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
