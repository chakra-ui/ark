'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseAccordionReturn } from './use-accordion.ts'
import { AccordionProvider } from './use-accordion-context.ts'

interface RootProviderProps {
  value: UseAccordionReturn
}

export interface AccordionRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface AccordionRootProviderProps extends HTMLProps<'div'>, AccordionRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const AccordionRootProvider = forwardRef<HTMLDivElement, AccordionRootProviderProps>((props, ref) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [{ value: accordion }, localProps] = splitRootProviderProps(accordionProps, ['value'])
  const mergedProps = mergeProps(accordion.getRootProps(), localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </AccordionProvider>
  )
})

AccordionRootProvider.displayName = 'AccordionRootProvider'
