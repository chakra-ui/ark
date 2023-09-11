import type { ItemProps, ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export type AccordionItemProps = ItemProps &
  Assign<
    HTMLArkProps<'div'>,
    {
      children?: React.ReactNode | ((props: ItemState) => React.ReactNode)
    }
  >

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, { children, ...rest }] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
  ])

  const { getItemProps, getItemState } = useAccordionContext()
  const itemState = getItemState(itemProps)
  const mergedProps = mergeProps(getItemProps(itemProps), rest)
  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={{ ...itemProps, ...itemState }}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
