import { splitItemProps, type ItemProps, type ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { Collapsible } from '../collapsible'
import { splitCollapsibleProps } from '../collapsible/split-collapsible-props'
import type { UseCollapsibleProps } from '../collapsible/use-collapsible'
import { type HTMLArkProps } from '../factory'
import { useRenderStrategyContext } from '../render-strategy'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps
  extends Assign<
      Assign<HTMLArkProps<'div'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
      UseCollapsibleProps
    >,
    ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [collapsibleProps, accordionItemProps] = splitCollapsibleProps(props)
  const [itemProps, { children, ...localProps }] = splitItemProps(accordionItemProps)

  const api = useAccordionContext()
  const renderStrategyProps = useRenderStrategyContext()

  const mergedItemProps = mergeProps(api.getItemProps(itemProps), localProps)
  const mergedCollapsibleProps = mergeProps(renderStrategyProps, collapsibleProps)

  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  const itemContentProps = api.getItemContentProps(itemProps)

  return (
    <AccordionItemProvider value={itemProps}>
      {/* @ts-expect-error TODO fix dir typing */}
      <Collapsible.Root
        ref={ref}
        open={itemState.isOpen}
        ids={{ content: itemContentProps.id }}
        {...mergedItemProps}
        {...mergedCollapsibleProps}
      >
        {view}
      </Collapsible.Root>
    </AccordionItemProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
