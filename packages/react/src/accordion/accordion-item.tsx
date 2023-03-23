import { forwardRef, type Assign } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = Assign<
  HTMLArkProps<'div'>,
  {
    value: string
    disabled?: boolean
    children?:
      | React.ReactNode
      | ((props: ReturnType<AccordionContext['getItemState']>) => React.ReactNode)
  }
>

export const AccordionItem = forwardRef<'div', AccordionItemProps>((props, ref) => {
  const { value, disabled, children, ...rest } = props
  const { getItemProps, getItemState } = useAccordionContext()
  const itemState = getItemState({ value })
  const mergedProps = mergeProps(getItemProps({ value, disabled }), rest)

  return (
    <AccordionItemProvider value={{ value, disabled, ...itemState }}>
      <ark.div {...mergedProps} ref={ref}>
        {typeof children === 'function' ? children(itemState) : children}
      </ark.div>
    </AccordionItemProvider>
  )
})
