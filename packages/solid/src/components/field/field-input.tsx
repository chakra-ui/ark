import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldInputState extends RootState {}
export interface FieldInputBaseProps extends PolymorphicProps<'input', FieldInputState> {}
export interface FieldInputProps extends HTMLProps<'input'>, FieldInputBaseProps {}

export const FieldInput = (props: FieldInputProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getInputProps(), props)
  return <ark.input {...mergedProps} state={field?.().getRootState()} />
}
