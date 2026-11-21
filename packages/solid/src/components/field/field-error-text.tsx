import type { ErrorTextProps, ErrorTextState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldErrorTextState extends ErrorTextState {}
export interface FieldErrorTextBaseProps extends ErrorTextProps, PolymorphicProps<'span', FieldErrorTextState> {}
export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}

export const FieldErrorText = (props: FieldErrorTextProps) => {
  const [errorTextProps, localProps] = createSplitProps<ErrorTextProps>()(props, ['match', 'id'])
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getErrorTextProps(errorTextProps), localProps)
  return <ark.span {...mergedProps} state={field?.().getErrorTextState(errorTextProps)} />
}
