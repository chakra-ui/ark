import type { ItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { Collapsible } from '../collapsible'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface AccordionItemProps extends HTMLProps<'div'>, AccordionItemBaseProps {}

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const accordion = useAccordionContext()
  const renderStrategyProps = useRenderStrategyContext()
  const mergedProps = mergeProps(() => accordion().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => accordion().getItemState(itemProps))
  const itemContentProps = accordion().getItemContentProps(itemProps)

  return (
    <AccordionItemPropsProvider value={itemProps}>
      <AccordionItemProvider value={itemState}>
        <Collapsible.Root
          open={itemState().expanded}
          ids={{ content: itemContentProps.id }}
          {...renderStrategyProps}
          {...mergedProps}
        />
      </AccordionItemProvider>
    </AccordionItemPropsProvider>
  )
}
