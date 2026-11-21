import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldHelperTextState extends RootState {}
export interface FieldHelperTextBaseProps extends PolymorphicProps<'span', FieldHelperTextState> {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = (props: FieldHelperTextProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getHelperTextProps(), props)
  return <ark.span {...mergedProps} state={field?.().getRootState()} />
}
