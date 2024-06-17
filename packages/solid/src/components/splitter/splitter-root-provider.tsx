import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseSplitterReturn } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

interface RootProviderProps {
  value: UseSplitterReturn
}

export interface SplitterRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SplitterRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    SplitterRootProviderBaseProps {}

export const SplitterRootProvider = (props: SplitterRootProviderProps) => {
  const [{ value: splitter }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => splitter().getRootProps(), localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}
