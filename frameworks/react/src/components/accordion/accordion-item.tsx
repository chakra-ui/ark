import { type ItemProps, splitItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { Collapsible } from '../../components'
import type { HTMLArkProps } from '../../factory'
import type { Assign } from '../../types'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import type { UseCollapsibleProps } from '../collapsible/use-collapsible'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemProps
  extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps>,
    ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props)
  const accordion = useAccordionContext()
  const renderStrategy = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(accordion.getItemProps(itemProps), localProps)
  const item = accordion.getItemState(itemProps)
  const itemContentProps = accordion.getItemContentProps(itemProps)

  return (
    <AccordionItemPropsProvider value={itemProps}>
      <AccordionItemProvider value={item}>
        {/* @ts-expect-error TODO fix dir typing */}
        <Collapsible.Root
          ref={ref}
          open={item.isOpen}
          ids={{ content: itemContentProps.id }}
          {...renderStrategy}
          {...mergedProps}
        />
      </AccordionItemProvider>
    </AccordionItemPropsProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
