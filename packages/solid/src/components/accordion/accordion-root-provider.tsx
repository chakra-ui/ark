import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseAccordionReturn } from './use-accordion.ts'
import { AccordionProvider } from './use-accordion-context.ts'

interface RootProviderProps {
  value: UseAccordionReturn
}

export interface AccordionRootProviderBaseProps
  extends RootProviderProps, RenderStrategyProps, PolymorphicProps<'div'> {}
export interface AccordionRootProviderProps extends HTMLProps<'div'>, AccordionRootProviderBaseProps {}

export const AccordionRootProvider = (props: AccordionRootProviderProps) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [{ value: accordion }, localProps] = createSplitProps<RootProviderProps>()(accordionProps, ['value'])

  const mergedProps = mergeProps(() => accordion().getRootProps(), localProps)

  return (
    <AccordionProvider value={accordion}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </AccordionProvider>
  )
}
