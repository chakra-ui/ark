import type { ScrollArrowProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectScrollArrowBaseProps extends ScrollArrowProps, PolymorphicProps<'div'> {}
export interface SelectScrollArrowProps extends HTMLProps<'div'>, SelectScrollArrowBaseProps {}

export const SelectScrollArrow = (props: SelectScrollArrowProps) => {
  const [scrollArrowProps, localProps] = createSplitProps<ScrollArrowProps>()(props, ['placement'])
  const select = useSelectContext()
  const mergedProps = mergeProps(() => select().getScrollArrowProps(scrollArrowProps), localProps)

  return <ark.div {...mergedProps} />
}
