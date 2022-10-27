import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

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
