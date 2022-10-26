import { ParentProps } from 'solid-js'
import { useAccordionContext } from './accordion-context'
import { AccordionItemContextProvider } from './accordion-item-context'

export type AccordionItemProps = ParentProps<{
  value: string
  disabled?: boolean
  class?: string
}>

export function AccordionItem(props: AccordionItemProps) {
  const { value, disabled } = props
  const api = useAccordionContext()
  const contextValue = { value, disabled: Boolean(disabled) }
  return (
    <AccordionItemContextProvider value={contextValue}>
      <div {...api?.().getItemProps({ value })} class={props.class}>
        {props.children}
      </div>
    </AccordionItemContextProvider>
  )
}
