import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseFieldProps, useField } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

export interface FieldRootState extends RootState {}
export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<'div', FieldRootState> {}
export interface FieldRootProps extends Assign<HTMLProps<'div'>, FieldRootBaseProps> {}

export const FieldRoot = (props: FieldRootProps) => {
  const [useFieldProps, localProps] = createSplitProps<UseFieldProps>()(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'errors',
    'dirty',
    'touched',
    'readOnly',
    'required',
    'target',
    'validate',
    'validationMode',
    'onValidityChange',
  ])
  const field = useField(useFieldProps)
  const mergedProps = mergeProps(() => field().getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} state={field().getRootState()} />
    </FieldProvider>
  )
}
