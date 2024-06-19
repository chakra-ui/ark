import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseAccordionProps, useAccordion } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

export interface AccordionRootBaseProps
  extends UseAccordionProps,
    RenderStrategyProps,
    PolymorphicProps<'div'> {}
export interface AccordionRootProps extends HTMLProps<'div'>, AccordionRootBaseProps {}

export const AccordionRoot = (props: AccordionRootProps) => {
  const [renderStrategyProps, accordionProps] = splitRenderStrategyProps(props)
  const [useAccordionProps, localProps] = createSplitProps<UseAccordionProps>()(accordionProps, [
    'collapsible',
    'defaultValue',
    'disabled',
    'id',
    'ids',
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
