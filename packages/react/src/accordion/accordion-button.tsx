import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLAtlasProps<'button'>

export const AccordionButton = forwardRef<'button', AccordionButtonProps>((props, ref) => {
  const { getTriggerProps } = useAccordionContext()
  const context = useAccordionItemContext()
  const mergedProps = mergeProps(getTriggerProps(context), props)

  return <atlas.button {...mergedProps} ref={ref} />
})
