import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type PolymorphicProps, ark } from '../factory'
import type { UseAccordionReturn } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

interface RootProviderProps {
  value: UseAccordionReturn
}

export interface AccordionRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps<'div'> {}
export interface AccordionRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    AccordionRootProviderBaseProps {}

export const AccordionRootProvider = (props: AccordionRootProviderProps) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [{ value: accordion }, localProps] = createSplitProps<RootProviderProps>()(accordionProps, [
    'value',
  ])

  const mergedProps = mergeProps(() => accordion().getRootProps(), localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </AccordionProvider>
  )
}
