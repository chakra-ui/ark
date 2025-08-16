import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaViewportBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaViewportProps extends Assign<HTMLProps<'div'>, ScrollAreaViewportBaseProps> {}

export const ScrollAreaViewport = (props: ScrollAreaViewportProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
