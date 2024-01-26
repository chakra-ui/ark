import { type ItemProps, type ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, usePresencePropsContext } from '../presence'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface AccordionItemProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const AccordionItem: ArkComponent<'div', ElementProps> = (props: AccordionItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useAccordionContext()
  const presenceProps = usePresencePropsContext()
  const presenceApi = usePresence(
    mergeProps(presenceProps, () => ({ present: api().getItemState(itemProps).isOpen })),
  )
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <AccordionItemProvider value={itemProps}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps}>{getChildren()}</ark.div>
      </PresenceProvider>
    </AccordionItemProvider>
  )
}
