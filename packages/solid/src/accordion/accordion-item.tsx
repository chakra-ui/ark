import { type ItemProps, type ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = Assign<
  HTMLArkProps<'div'>,
  ItemProps & {
    children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
  }
>

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemProps, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useAccordionContext()

  const mergedProps = mergeProps(() => api().getItemProps(itemProps), restProps)
  const accordionItem = mergeProps(() => api().getItemState(itemProps), itemProps)

  const getChildren = () => runIfFn(restProps.children, () => api().getItemState(itemProps))

  return (
    <AccordionItemProvider value={accordionItem}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </AccordionItemProvider>
  )
}
