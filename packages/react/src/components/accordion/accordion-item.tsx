'use client'

import type { ItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { Collapsible } from '../../components/index.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { useAccordionContext } from './use-accordion-context.ts'
import { AccordionItemProvider } from './use-accordion-item-context.ts'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context.ts'

export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
export interface AccordionItemProps extends HTMLProps<'div'>, AccordionItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['value', 'disabled'])
  const accordion = useAccordionContext()
  const renderStrategy = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(accordion.getItemProps(itemProps), localProps)
  const item = accordion.getItemState(itemProps)
  const itemContentProps = accordion.getItemContentProps(itemProps)

  return (
    <AccordionItemPropsProvider value={itemProps}>
      <AccordionItemProvider value={item}>
        <Collapsible.Root
          ref={ref}
          open={item.expanded}
          ids={{ content: itemContentProps.id }}
          {...renderStrategy}
          {...mergedProps}
        />
      </AccordionItemProvider>
    </AccordionItemPropsProvider>
  )
})

AccordionItem.displayName = 'AccordionItem'
