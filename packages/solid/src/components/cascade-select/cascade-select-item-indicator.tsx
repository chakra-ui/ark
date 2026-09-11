import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

export interface CascadeSelectItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface CascadeSelectItemIndicatorProps extends HTMLProps<'div'>, CascadeSelectItemIndicatorBaseProps {}

export const CascadeSelectItemIndicator = (props: CascadeSelectItemIndicatorProps) => {
  const context = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemIndicatorProps(itemProps), props)
  return <ark.div {...mergedProps} />
}
