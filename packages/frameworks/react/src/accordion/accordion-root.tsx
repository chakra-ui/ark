import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { RenderStrategyProvider, type RenderStrategyProps } from '../render-strategy'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export interface AccordionRootProps
  extends Assign<HTMLArkProps<'div'>, UseAccordionProps>,
    RenderStrategyProps {}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>((props, ref) => {
  const [renderStrategyProps, accordionProps] = createSplitProps<RenderStrategyProps>()(props, [
    'lazyMount',
    'unmountOnExit',
  ])
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
  const api = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <AccordionProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyProvider>
    </AccordionProvider>
  )
})

AccordionRoot.displayName = 'AccordionRoot'
