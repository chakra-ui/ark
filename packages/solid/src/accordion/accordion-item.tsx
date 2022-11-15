import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = Assign<
  HTMLArkProps<'div'>,
  {
    value: string
    disabled?: boolean
  }
>

export function AccordionItem(props: AccordionItemProps) {
  const [itemProps, htmlProps] = splitProps(props, ['value', 'disabled'])
  const api = useAccordionContext()
  return (
    <AccordionItemProvider value={itemProps}>
      <ark.div {...api?.().getItemProps({ value: itemProps.value })} {...htmlProps} />
    </AccordionItemProvider>
  )
}
