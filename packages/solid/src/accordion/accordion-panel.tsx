import { ParentProps } from 'solid-js'
import { useAccordionItemContext } from './accordion-item-context'
import { useAccordionContext } from './accordion-context'

export type AccordionPanelProps = ParentProps<{
  class?: string
}>

export function AccordionPanel(props: AccordionPanelProps) {
  const api = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <div
      {...api?.().getContentProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
