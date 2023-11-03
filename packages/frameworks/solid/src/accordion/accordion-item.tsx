import { type ItemProps, type ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
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
  extends Assign<
      HTMLArkProps<'div'>,
      ItemProps & {
        children?: JSX.Element | ((state: () => ItemState) => JSX.Element)
      }
    >,
    UsePresenceProps {}

export const AccordionItem = (props: AccordionItemProps) => {
  const [presenceProps, popoverProps] = splitPresenceProps(props)
  const [itemProps, restProps] = createSplitProps<ItemProps>()(popoverProps, ['value', 'disabled'])
  const api = useAccordionContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), restProps)
  const accordionItem = mergeProps(() => api().getItemState(itemProps), itemProps)
  const apiPresence = usePresence(
    mergeProps(presenceProps, () => ({ present: accordionItem.isOpen })),
  )

  const getChildren = () => runIfFn(restProps.children, () => api().getItemState(itemProps))

  return (
    <AccordionItemProvider value={accordionItem}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
}
