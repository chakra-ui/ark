import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLArkProps<'div'>

export function AccordionPanel(props: AccordionPanelProps) {
  const api = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <ark.div
      {...api?.().getContentProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
