import { ParentProps } from 'solid-js'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = ParentProps<{
  class?: string
}>

export function AccordionButton(props: AccordionButtonProps) {
  const api = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <button
      {...api?.().getTriggerProps?.({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
