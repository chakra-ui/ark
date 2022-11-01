import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { AccordionItemContext, AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = HTMLAtlasProps<'div'> & AccordionItemContext

export const AccordionItem = forwardRef<'div', AccordionItemProps>((props, ref) => {
  const { value, disabled, ...htmlProps } = props
  const { getItemProps } = useAccordionContext()

  return (
    <AccordionItemProvider value={{ value, disabled }}>
      <atlas.div {...htmlProps} {...getItemProps({ value, disabled })} ref={ref} />
    </AccordionItemProvider>
  )
})
