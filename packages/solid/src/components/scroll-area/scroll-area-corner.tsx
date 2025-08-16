import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaCornerBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaCornerProps extends Assign<HTMLProps<'div'>, ScrollAreaCornerBaseProps> {}

export const ScrollAreaCorner = (props: ScrollAreaCornerProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getCornerProps(), props)

  return <ark.div {...mergedProps} />
}
