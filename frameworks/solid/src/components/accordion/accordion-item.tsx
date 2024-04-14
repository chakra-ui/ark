import type { ItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { Collapsible } from '../collapsible'
import type { UseCollapsibleProps } from '../collapsible/use-collapsible'
import type { HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemPropsProvider, AccordionItemProvider } from './use-accordion-item-context'

export interface AccordionItemProps
  extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps>,
    ItemProps {}

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const context = useAccordionContext()
  const renderStrategyProps = useRenderStrategyContext()
  const mergedProps = mergeProps(() => context().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => context().getItemState(itemProps))
  const itemContentProps = context().getItemContentProps(itemProps)

  return (
    <AccordionItemPropsProvider value={itemProps}>
      <AccordionItemProvider value={itemState}>
        <Collapsible.Root
          open={itemState().isOpen}
          ids={{ content: itemContentProps.id }}
          {...renderStrategyProps}
          {...mergedProps}
        />
      </AccordionItemProvider>
    </AccordionItemPropsProvider>
  )
}
