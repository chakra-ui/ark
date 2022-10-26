import { HTMLProps } from 'react'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLProps<HTMLDivElement>

export const AccordionPanel = (props: AccordionPanelProps) => {
  const { api } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <div
      {...api.getContentProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
}
