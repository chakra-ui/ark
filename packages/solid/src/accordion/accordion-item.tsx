import { type Assign } from '@polymorphic-factory/solid'
import { children, splitProps, type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
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
  const view = () =>
    children(() => runIfFn(divProps.children, () => accordion().getItemState(props)))

  return (
    <AccordionItemProvider value={itemProps}>
      <ark.div {...accordion().getItemProps(itemProps)} {...divProps}>
        {view}
      </ark.div>
    </AccordionItemProvider>
  )
}
