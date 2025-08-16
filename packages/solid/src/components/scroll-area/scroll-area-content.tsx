import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

export interface ScrollAreaContentBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaContentProps extends Assign<HTMLProps<'div'>, ScrollAreaContentBaseProps> {}

export const ScrollAreaContent = (props: ScrollAreaContentProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getContentProps(), props)

  return <ark.div {...mergedProps} />
}
