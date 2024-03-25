import { splitItemProps, type ItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { Collapsible } from '../collapsible'
import type { UseCollapsibleProps } from '../collapsible/use-collapsible'
import { type HTMLArkProps } from '../factory'
import { useRenderStrategyContext } from '../render-strategy'
import type { Assign } from '../types'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'

export interface AccordionItemProps
  extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps>,
    ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props)
  const context = useAccordionContext()
  const renderStrategyProps = useRenderStrategyContext()
  const mergedItemProps = mergeProps(context.getItemProps(itemProps), localProps)
  const itemState = context.getItemState(itemProps)
  const itemContentProps = context.getItemContentProps(itemProps)

  return (
    <AccordionItemProvider value={{ ...itemProps, ...itemState }}>
      {/* @ts-expect-error TODO fix dir typing */}
      <Collapsible.Root
        ref={ref}
        open={itemState.isOpen}
        ids={{ content: itemContentProps.id }}
        {...renderStrategyProps}
        {...mergedItemProps}
      />
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
