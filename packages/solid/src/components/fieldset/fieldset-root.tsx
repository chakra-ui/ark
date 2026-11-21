import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseFieldsetProps, useFieldset } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

export interface FieldsetRootState extends RootState {}
export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps<'fieldset', FieldsetRootState> {}
export interface FieldsetRootProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootBaseProps> {}

export const FieldsetRoot = (props: FieldsetRootProps) => {
  const [useFieldsetProps, localProps] = createSplitProps<UseFieldsetProps>()(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
  ])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps(() => fieldset().getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} state={fieldset().getRootState()} />
    </FieldsetProvider>
  )
}
