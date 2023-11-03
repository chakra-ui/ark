import type { ItemProps, ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends ItemProps,
    Assign<
      HTMLArkProps<'div'>,
      { children?: React.ReactNode | ((props: ItemState) => React.ReactNode) }
    >,
    UsePresenceProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [presenceProps, accordionItemProps] = splitPresenceProps(props)
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(
    accordionItemProps,
    ['value', 'disabled'],
  )

  const api = useAccordionContext()
  const itemState = api.getItemState(itemProps)
  const presenceApi = usePresence({ ...presenceProps, present: itemState.isOpen })

  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={{ ...itemProps, ...itemState }}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
