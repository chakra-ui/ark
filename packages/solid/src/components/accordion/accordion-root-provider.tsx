import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
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

export const AccordionRootProvider = (props: AccordionRootProviderProps) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [{ value: accordion }, localProps] = createSplitProps<RootProviderProps>()(accordionProps, [
    'value',
  ])

  const mergedProps = mergeProps(() => accordion().rootProps, localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </AccordionProvider>
  )
}
