import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseFieldReturn } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderState extends RootState {}
export interface FieldRootProviderBaseProps extends PolymorphicProps<'div', FieldRootProviderState> {}
export interface FieldRootProviderProps extends HTMLProps<'div'>, RootProviderProps, FieldRootProviderBaseProps {}

export const FieldRootProvider = (props: FieldRootProviderProps) => {
  const [{ value: field }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => field().getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} state={field().getRootState()} />
    </FieldProvider>
  )
}
