import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = HTMLAtlasProps<'div'> & {
  value: string
  disabled?: boolean
  children?:
    | React.ReactNode
    | ((props: ReturnType<AccordionContext['getItemState']>) => React.ReactNode)
}

export const AccordionItem = forwardRef<'div', AccordionItemProps>((props, ref) => {
  const { value, disabled, children, ...htmlProps } = props
  const { getItemProps, getItemState } = useAccordionContext()
  const itemState = getItemState({ value })

  return (
    <AccordionItemProvider value={{ value, disabled, ...itemState }}>
      <atlas.div {...htmlProps} {...getItemProps({ value, disabled })} ref={ref}>
        {typeof children === 'function' ? children(itemState) : children}
      </atlas.div>
    </AccordionItemProvider>
  )
})
