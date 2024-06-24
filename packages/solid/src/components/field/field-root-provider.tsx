import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseFieldReturn } from './use-field'
import { FieldProvider } from './use-field-context'

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface FieldRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    FieldRootProviderBaseProps {}

export const FieldRootProvider = (props: FieldRootProviderProps) => {
  const [{ value: field }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => field().getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} />
    </FieldProvider>
  )
}
