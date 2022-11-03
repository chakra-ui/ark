import type { JSX } from 'solid-js'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

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
