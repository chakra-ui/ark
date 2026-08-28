import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseFieldReturn } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface FieldRootProviderProps extends HTMLProps<'div'>, RootProviderProps, FieldRootProviderBaseProps {}

export const FieldRootProvider = (props: FieldRootProviderProps) => {
  const [{ value: field }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => field().getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} />
    </FieldProvider>
  )
}
