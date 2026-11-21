import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from './use-field-context.ts'

export interface FieldSelectState extends RootState {}
export interface FieldSelectBaseProps extends PolymorphicProps<'select', FieldSelectState> {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = (props: FieldSelectProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getSelectProps(), props)
  return <ark.select {...mergedProps} state={field?.().getRootState()} />
}
