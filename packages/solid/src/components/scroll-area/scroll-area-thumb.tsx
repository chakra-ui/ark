import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useScrollAreaContext } from './use-scroll-area-context.ts'
import { useScrollAreaScrollbarContext } from './use-scroll-area-scrollbar-context.ts'

export interface ScrollAreaThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}

export const ScrollAreaThumb = (props: ScrollAreaThumbProps) => {
  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = mergeProps(() => scrollAreaApi().getThumbProps(scrollbarProps), props)

  return <ark.div {...mergedProps} />
}
