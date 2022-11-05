import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLAtlasProps<'div'>

export const AccordionPanel = forwardRef<'div', AccordionPanelProps>((props, ref) => {
  const { getContentProps } = useAccordionContext()
  const context = useAccordionItemContext()
  const mergedProps = mergeProps(getContentProps(context), props)

  return <atlas.div {...mergedProps} ref={ref} />
})
