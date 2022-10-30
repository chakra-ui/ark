/** @jsxImportSource solid-js */
import { JSX, splitProps } from 'solid-js'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  value: string
  disabled?: boolean
}

export function AccordionItem(props: AccordionItemProps) {
  const [itemProps, htmlProps] = splitProps(props, ['value', 'disabled'])
  const api = useAccordionContext()
  return (
    <AccordionItemProvider value={itemProps}>
      <div {...api?.().getItemProps({ value: itemProps.value })} {...htmlProps} />
    </AccordionItemProvider>
  )
}
