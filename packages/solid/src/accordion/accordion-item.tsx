import type { Assign } from '@polymorphic-factory/solid'
import { JSX, splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = Assign<
  HTMLArkProps<'div'>,
  {
    value: string
    disabled?: boolean
    children?: JSX.Element
    // | ((props: ReturnType<AccordionContext['getItemState']>) => JSX.Element) -> TODO enable render prop fn
  }
>

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemProps, divProps] = splitProps(props, ['value', 'disabled'])
  const api = useAccordionContext()

  return (
    <AccordionItemProvider value={itemProps}>
      <ark.div {...api().getItemProps(itemProps)} {...divProps} />
    </AccordionItemProvider>
  )
}
