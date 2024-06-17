import { type ItemProps, splitItemProps } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { Collapsible } from '../../components'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import type { PolymorphicProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
export interface AccordionItemProps
  extends HTMLAttributes<HTMLDivElement>,
    AccordionItemBaseProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props)
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
