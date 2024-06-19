import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSplitterProps, useSplitter } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps {}
export interface SplitterRootProps extends HTMLProps<'div'>, SplitterRootBaseProps {}

export const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>((props, ref) => {
  const [useSplitterProps, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'defaultSize',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'orientation',
    'size',
  ])
  const splitter = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(splitter.getRootProps(), localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref} />
    </SplitterProvider>
  )
})

SplitterRoot.displayName = 'SplitterRoot'
