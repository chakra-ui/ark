import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

export interface ScrollAreaContentBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaContentProps extends Assign<HTMLProps<'div'>, ScrollAreaContentBaseProps> {}

export const ScrollAreaContent = (props: ScrollAreaContentProps) => {
  const scrollArea = useScrollAreaContext()
  const mergedProps = mergeProps(() => scrollArea().getContentProps(), props)

  return <ark.div {...mergedProps} />
}
