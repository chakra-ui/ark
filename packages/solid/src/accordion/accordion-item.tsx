import { mergeProps } from '@zag-js/solid'
import { createMemo, splitProps, type JSX } from 'solid-js'
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
  const [itemProps, divProps] = splitProps(props, ['value', 'disabled'])
  const accordion = useAccordionContext()
  const mergedProps = createMemo(() => mergeProps(accordion().getItemProps(itemProps), divProps))
  const view = () => runIfFn(divProps.children, () => accordion().getItemState(props))

  return (
    <AccordionItemProvider value={itemProps}>
      <ark.div {...mergedProps}>{view()}</ark.div>
    </AccordionItemProvider>
  )
}
