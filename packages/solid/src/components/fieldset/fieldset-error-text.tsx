import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetErrorTextState extends RootState {}
export interface FieldsetErrorTextBaseProps extends PolymorphicProps<'span', FieldsetErrorTextState> {}
export interface FieldsetErrorTextProps extends HTMLProps<'span'>, FieldsetErrorTextBaseProps {}

export const FieldsetErrorText = (props: FieldsetErrorTextProps) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(() => fieldset?.().getErrorTextProps(), props)
  return <ark.span {...mergedProps} state={fieldset?.().getRootState()} />
}
