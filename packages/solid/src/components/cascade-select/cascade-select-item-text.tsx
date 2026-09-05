import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'
import { useCascadeSelectItemPropsContext } from './use-cascade-select-item-props-context'

export interface CascadeSelectItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface CascadeSelectItemTextProps extends HTMLProps<'span'>, CascadeSelectItemTextBaseProps {}

export const CascadeSelectItemText = (props: CascadeSelectItemTextProps) => {
  const context = useCascadeSelectContext()
  const itemProps = useCascadeSelectItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemTextProps(itemProps), props)
  return <ark.span {...mergedProps} />
}
