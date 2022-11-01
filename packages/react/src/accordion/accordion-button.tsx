import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLAtlasProps<'button'>

export const AccordionButton = forwardRef<'button'>((props, ref) => {
  const { getTriggerProps } = useAccordionContext()
  const context = useAccordionItemContext()
  return <atlas.button ref={ref} {...getTriggerProps(context)} {...props} />
})
