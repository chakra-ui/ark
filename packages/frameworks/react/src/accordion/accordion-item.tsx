import type { ItemProps, ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends ItemProps,
    Assign<
      HTMLArkProps<'div'>,
      { children?: React.ReactNode | ((props: ItemState) => React.ReactNode) }
    > {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
  ])

  const api = useAccordionContext()
  const [presenceProps] = splitPresenceProps(api)
  const itemState = api.getItemState(itemProps)
  const itemPresenceApi = usePresence({ ...presenceProps, present: itemState.isOpen })
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={{ ...itemProps, ...itemState }}>
      <PresenceProvider value={itemPresenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
