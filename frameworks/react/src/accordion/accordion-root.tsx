import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
  type RenderStrategyProps,
} from '../render-strategy'
import type { Assign } from '../types'
import { useAccordion, type UseAccordionProps } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

export interface AccordionRootProps
  extends Assign<HTMLArkProps<'div'>, UseAccordionProps>,
    RenderStrategyProps {}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>((props, ref) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [useAccordionProps, localProps] = createSplitProps<UseAccordionProps>()(accordionProps, [
    'collapsible',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'multiple',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'value',
  ])
  const accordion = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(accordion.rootProps, localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </AccordionProvider>
  )
})

AccordionRoot.displayName = 'AccordionRoot'
