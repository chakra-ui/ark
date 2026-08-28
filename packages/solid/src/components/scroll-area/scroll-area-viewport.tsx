import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

export interface ScrollAreaViewportBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaViewportProps extends Assign<HTMLProps<'div'>, ScrollAreaViewportBaseProps> {}

export const ScrollAreaViewport = (props: ScrollAreaViewportProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
