import { mergeProps } from '@zag-js/solid'
import { splitProps, type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemState = () => ReturnType<ReturnType<AccordionContext>['getItemState']>

export type AccordionItemProps = Assign<
  HTMLArkProps<'div'>,
  {
    value: string
    disabled?: boolean
    children?: JSX.Element | ((state: AccordionItemState) => JSX.Element)
  }
>

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemParams, restProps] = splitProps(props, ['value', 'disabled'])
  const api = useAccordionContext()

  const itemProps = mergeProps(() => api().getItemProps(itemParams), restProps)
  const getChildren = () => runIfFn(restProps.children, () => api().getItemState(itemParams))

  return (
    <AccordionItemProvider value={itemParams}>
      <ark.div {...itemProps}>{getChildren()}</ark.div>
    </AccordionItemProvider>
  )
}
