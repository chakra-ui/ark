/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = JSX.HTMLAttributes<HTMLDivElement>

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
