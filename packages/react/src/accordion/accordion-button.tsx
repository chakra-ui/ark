import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import { forwardRef } from '../forwardRef'

export type AccordionButtonProps = HTMLAtlasProps<'button'>

export const AccordionButton = forwardRef<'button'>((props) => {
  const { api } = useAccordionContext()
  const { value, disabled } = useAccordionItemContext()
  return (
    <atlas.button
      {...api.getTriggerProps({
        value,
        disabled,
      })}
      {...props}
    />
  )
})
