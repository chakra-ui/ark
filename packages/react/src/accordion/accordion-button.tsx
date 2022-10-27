import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

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
