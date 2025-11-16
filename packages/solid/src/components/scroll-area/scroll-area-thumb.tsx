import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { useScrollAreaScrollbarContext } from './use-scroll-area-scrollbar-context'

export interface ScrollAreaThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}

export const ScrollAreaThumb = (props: ScrollAreaThumbProps) => {
  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = mergeProps(() => scrollAreaApi().getThumbProps(scrollbarProps), props)

  return <ark.div {...mergedProps} />
}
