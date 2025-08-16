import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseScrollAreaProps, useScrollArea } from './use-scroll-area'
import { ScrollAreaProvider } from './use-scroll-area-context'

export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps {}
export interface ScrollAreaRootProps extends HTMLProps<'div'>, ScrollAreaRootBaseProps {}

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollAreaRootProps>((props, ref) => {
  const [useScrollAreaProps, localProps] = createSplitProps<UseScrollAreaProps>()(props, ['id', 'ids'])
  const scrollArea = useScrollArea(useScrollAreaProps)
  const mergedProps = mergeProps(scrollArea.getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaProvider>
  )
})

ScrollAreaRoot.displayName = 'ScrollAreaRoot'
