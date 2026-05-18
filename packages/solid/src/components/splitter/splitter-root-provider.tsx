import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseSplitterReturn } from './use-splitter.ts'
import { SplitterProvider } from './use-splitter-context.ts'

interface RootProviderProps {
  value: UseSplitterReturn
}

export interface SplitterRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SplitterRootProviderProps extends HTMLProps<'div'>, RootProviderProps, SplitterRootProviderBaseProps {}

export const SplitterRootProvider = (props: SplitterRootProviderProps) => {
  const [{ value: splitter }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => splitter().getRootProps(), localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}
