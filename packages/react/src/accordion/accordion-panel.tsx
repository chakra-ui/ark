import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLAtlasProps<'div'>

export const AccordionPanel = forwardRef<'div'>((props, ref) => {
  const { getContentProps } = useAccordionContext()
  const context = useAccordionItemContext()

  return <atlas.div {...props} {...getContentProps(context)} ref={ref} />
})
