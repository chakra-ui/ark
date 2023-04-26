import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
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
  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={{ value, disabled, ...itemState }}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </AccordionItemProvider>
  )
})
