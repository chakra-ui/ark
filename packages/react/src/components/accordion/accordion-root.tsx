'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { AccordionProvider } from './use-accordion-context.ts'
import { type UseAccordionProps, useAccordion } from './use-accordion.ts'

export interface AccordionRootBaseProps extends UseAccordionProps, RenderStrategyProps, PolymorphicProps {}
export interface AccordionRootProps extends Assign<HTMLProps<'div'>, AccordionRootBaseProps> {}

const splitRootProps = createSplitProps<UseAccordionProps>()

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>((props, ref) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [useAccordionProps, localProps] = splitRootProps(accordionProps, [
    'collapsible',
    'defaultValue',
    'disabled',
    'id',
    'ids',
    'loopFocus',
    'multiple',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'value',
  ])
  const accordion = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(accordion.getRootProps(), localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </AccordionProvider>
  )
})

AccordionRoot.displayName = 'AccordionRoot'
