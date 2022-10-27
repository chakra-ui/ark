import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import { forwardRef } from '../forwardRef'
import { atlas, HTMLAtlasProps } from '../factory'

export type AccordionPanelProps = HTMLAtlasProps<'div'>

export const AccordionPanel = forwardRef<'div'>((props, ref) => {
  const { api } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()

  return (
    <atlas.div
      {...api.getContentProps({
        value,
        disabled,
      })}
      {...props}
      ref={ref}
    />
  )
})
