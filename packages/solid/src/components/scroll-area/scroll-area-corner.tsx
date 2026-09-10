import type { CornerState } from '@zag-js/scroll-area'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

export interface ScrollAreaCornerState extends CornerState {}

export interface ScrollAreaCornerBaseProps extends PolymorphicProps<'div', ScrollAreaCornerState> {}
export interface ScrollAreaCornerProps extends Assign<HTMLProps<'div'>, ScrollAreaCornerBaseProps> {}

export const ScrollAreaCorner = (props: ScrollAreaCornerProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getCornerProps(), props)

  return <ark.div {...mergedProps} state={scrollArea().getCornerState()} />
}
