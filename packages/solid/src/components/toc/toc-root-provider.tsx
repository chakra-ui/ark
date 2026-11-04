import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseTocReturn } from './use-toc.ts'
import { TocProvider } from './use-toc-context.ts'

interface RootProviderProps {
  value: UseTocReturn
}

export interface TocRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface TocRootProviderProps extends HTMLProps<'div'>, TocRootProviderBaseProps {}

export const TocRootProvider = (props: TocRootProviderProps) => {
  const [{ value: toc }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => toc().getRootProps(), localProps)

  return (
    <TocProvider value={toc}>
      <ark.div {...mergedProps} />
    </TocProvider>
  )
}
