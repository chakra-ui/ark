import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseScrollAreaProps, useScrollArea } from './use-scroll-area'
import { ScrollAreaProvider } from './use-scroll-area-context'

export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps<'div'> {}
export interface ScrollAreaRootProps extends Assign<HTMLProps<'div'>, ScrollAreaRootBaseProps> {}

export const ScrollAreaRoot = (props: ScrollAreaRootProps) => {
  const [useScrollAreaProps, localProps] = createSplitProps<UseScrollAreaProps>()(props, ['id', 'ids'])
  const scrollArea = useScrollArea(useScrollAreaProps)
  const mergedProps = mergeProps(() => scrollArea().getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} />
    </ScrollAreaProvider>
  )
}
