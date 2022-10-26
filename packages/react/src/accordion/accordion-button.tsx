import { ButtonHTMLAttributes } from 'react'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const AccordionButton = (props: AccordionButtonProps) => {
  const { api } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()
  return (
    <button
      {...api.getTriggerProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
