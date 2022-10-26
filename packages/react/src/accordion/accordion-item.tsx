import { HTMLProps } from 'react'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = HTMLProps<HTMLDivElement> & { value: string }

export const AccordionItem = (props: AccordionItemProps) => {
  const { value, disabled, ...htmlProps } = props
  const { api } = useAccordionContext()

  return (
    <AccordionItemProvider value={{ value, disabled }}>
      <div {...api.getItemProps({ value, disabled })} {...htmlProps} />
    </AccordionItemProvider>
  )
}
