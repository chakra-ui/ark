import type { ItemProps, ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { Collapsible } from '../collapsible'
import { createSplitProps } from '../create-split-props'
import { type HTMLArkProps } from '../factory'
import { useRenderStrategyContext } from '../render-strategy'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
    ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
  ])
  const api = useAccordionContext()
  const itemState = api.getItemState(itemProps)
  const itemContentProps = api.getItemContentProps(itemProps)
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const renderStrategyProps = useRenderStrategyContext()
  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={itemProps}>
      {/* @ts-expect-error dir is not properly typed */}
      <Collapsible.Root
        ref={ref}
        open={itemState.isOpen}
        ids={{ content: itemContentProps.id }}
        {...renderStrategyProps}
        {...mergedProps}
      >
        {view}
      </Collapsible.Root>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
