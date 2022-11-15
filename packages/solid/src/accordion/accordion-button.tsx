import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLArkProps<'button'>

export function AccordionButton(props: AccordionButtonProps) {
  const api = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <ark.button
      {...api?.().getTriggerProps?.({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
