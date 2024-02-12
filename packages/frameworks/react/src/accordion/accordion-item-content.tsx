import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  (props, ref) => {
    const api = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const presenceApi = usePresenceContext()
    const mergedProps = mergeProps(
      api.getItemContentProps(accordionItem),
      presenceApi.getPresenceProps(ref),
      props,
    )

    if (presenceApi.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

AccordionItemContent.displayName = 'AccordionItemContent'
