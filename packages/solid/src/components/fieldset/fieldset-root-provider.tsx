import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseFieldsetReturn } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

interface RootProviderProps {
  value: UseFieldsetReturn
}

export interface FieldsetRootProviderState extends RootState {}
export interface FieldsetRootProviderBaseProps extends PolymorphicProps<'fieldset', FieldsetRootProviderState> {}
export interface FieldsetRootProviderProps
  extends HTMLProps<'fieldset'>, RootProviderProps, FieldsetRootProviderBaseProps {}

export const FieldsetRootProvider = (props: FieldsetRootProviderProps) => {
  const [{ value: fieldset }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => fieldset().getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} state={fieldset().getRootState()} />
    </FieldsetProvider>
  )
}
