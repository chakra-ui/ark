import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldLabelState extends RootState {}
export interface FieldLabelBaseProps extends PolymorphicProps<'label', FieldLabelState> {}
export interface FieldLabelProps extends HTMLProps<'label'>, FieldLabelBaseProps {}

export const FieldLabel = (props: FieldLabelProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getLabelProps(), props)
  return <ark.label {...mergedProps} state={field?.().getRootState()} />
}
