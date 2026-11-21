import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetHelperTextState extends RootState {}
export interface FieldsetHelperTextBaseProps extends PolymorphicProps<'span', FieldsetHelperTextState> {}
export interface FieldsetHelperTextProps extends HTMLProps<'span'>, FieldsetHelperTextBaseProps {}

export const FieldsetHelperText = (props: FieldsetHelperTextProps) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(() => fieldset?.().getHelperTextProps(), props)
  return <ark.span {...mergedProps} state={fieldset?.().getRootState()} />
}
