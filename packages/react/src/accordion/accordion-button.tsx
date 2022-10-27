import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLAtlasProps<'button'>

export const AccordionButton = forwardRef<'button'>((props, ref) => {
  const { api } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()
  return (
    <atlas.button
      ref={ref}
      {...api.getTriggerProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
})
