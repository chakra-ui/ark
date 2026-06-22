import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseAccordionProps, useAccordion } from './use-accordion.ts'
import { AccordionProvider } from './use-accordion-context.ts'

export interface AccordionRootBaseProps extends UseAccordionProps, RenderStrategyProps, PolymorphicProps<'div'> {}
export interface AccordionRootProps extends HTMLProps<'div'>, AccordionRootBaseProps {}

export const AccordionRoot = (props: AccordionRootProps) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [useAccordionProps, localProps] = createSplitProps<UseAccordionProps>()(accordionProps, [
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
  const api = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <AccordionProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </AccordionProvider>
  )
}
