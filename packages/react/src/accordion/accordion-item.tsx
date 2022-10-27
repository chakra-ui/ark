import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = HTMLAtlasProps<'div'> & { disabled?: boolean; value: string }

export const AccordionItem = forwardRef<'div', AccordionItemProps>((props, ref) => {
  const { value, disabled, ...htmlProps } = props
  const { api } = useAccordionContext()

  return (
    <AccordionItemProvider value={{ value, disabled }}>
      <atlas.div {...api.getItemProps({ value, disabled })} {...htmlProps} ref={ref} />
    </AccordionItemProvider>
  )
})
