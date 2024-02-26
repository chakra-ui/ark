import type { ItemProps, ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useRenderStrategyContext } from '../render-strategy'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
    ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'value',
    'disabled',
  ])
  const api = useAccordionContext()
  const itemState = api.getItemState(itemProps)
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence({ ...renderStrategyProps, present: itemState.isOpen })

  const view = runIfFn(children, itemState)

  return (
    <AccordionItemProvider value={itemProps}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} ref={ref}>
          {view}
        </ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
