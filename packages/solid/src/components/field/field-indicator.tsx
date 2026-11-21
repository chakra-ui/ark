import type { IndicatorProps, IndicatorState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldIndicatorState extends IndicatorState {}
export interface FieldIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'span', FieldIndicatorState> {}
export interface FieldIndicatorProps extends HTMLProps<'span'>, FieldIndicatorBaseProps {}

export const FieldIndicator = (props: FieldIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['type'])
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getIndicatorProps(indicatorProps), localProps)
  return <ark.span {...mergedProps} state={field?.().getIndicatorState(indicatorProps)} />
}
