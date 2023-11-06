import { type ItemProps, type ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, usePresencePropsContext } from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends Assign<
    HTMLArkProps<'div'>,
    ItemProps & {
      children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
    }
  > {}

export const AccordionItem = (props: AccordionItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useAccordionContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const presenceProps = usePresencePropsContext()
  const itemState = mergeProps(() => api().getItemState(itemProps), itemProps)
  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: itemState.isOpen })))
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <AccordionItemProvider value={itemState}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
}
