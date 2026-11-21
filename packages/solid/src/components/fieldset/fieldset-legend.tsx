import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetLegendState extends RootState {}
export interface FieldsetLegendBaseProps extends PolymorphicProps<'legend', FieldsetLegendState> {}
export interface FieldsetLegendProps extends HTMLProps<'legend'>, FieldsetLegendBaseProps {}

export const FieldsetLegend = (props: FieldsetLegendProps) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(() => fieldset?.().getLegendProps(), props)
  return <ark.legend {...mergedProps} state={fieldset?.().getRootState()} />
}
