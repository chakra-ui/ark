import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import type { UseAccordionReturn } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

interface RootProviderProps {
  value: UseAccordionReturn
}

export interface AccordionRootProviderProps
  extends HTMLArkProps<'div'>,
    RootProviderProps,
    RenderStrategyProps {}

export const AccordionRootProvider = forwardRef<HTMLDivElement, AccordionRootProviderProps>(
  (props, ref) => {
    const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
    const [{ value: accordion }, localProps] = createSplitProps<RootProviderProps>()(
      accordionProps,
      ['value'],
    )
    const mergedProps = mergeProps(accordion.getRootProps(), localProps)

    return (
      <AccordionProvider value={accordion}>
        <RenderStrategyPropsProvider value={renderStrategyProps}>
          <ark.div {...mergedProps} ref={ref} />
        </RenderStrategyPropsProvider>
      </AccordionProvider>
    )
  },
)

AccordionRootProvider.displayName = 'AccordionRootProvider'
