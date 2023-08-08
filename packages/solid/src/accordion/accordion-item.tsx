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
  {
    value: string
    disabled?: boolean
    children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
  }
>

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemParams, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useAccordionContext()

  const itemProps = mergeProps(() => api().getItemProps(itemParams), restProps)
  const getChildren = () => runIfFn(restProps.children, () => api().getItemState(itemParams))

  return (
    <AccordionItemProvider value={itemParams}>
      <ark.div {...itemProps}>{getChildren()}</ark.div>
    </AccordionItemProvider>
  )
}
