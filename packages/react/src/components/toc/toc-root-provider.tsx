import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTocReturn } from './use-toc'
import { TocProvider } from './use-toc-context'

interface RootProviderProps {
  value: UseTocReturn
}

export interface TocRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TocRootProviderProps extends Assign<HTMLProps<'div'>, TocRootProviderBaseProps> {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const TocRootProvider = forwardRef<HTMLDivElement, TocRootProviderProps>((props, ref) => {
  const [{ value: toc }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(toc.getRootProps(), localProps)

  return (
    <TocProvider value={toc}>
      <ark.div {...mergedProps} ref={ref} />
    </TocProvider>
  )
})

TocRootProvider.displayName = 'TocRootProvider'
