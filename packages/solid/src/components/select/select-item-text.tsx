import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSelectContext } from './use-select-context.ts'
import { useSelectItemPropsContext } from './use-select-item-props-context.ts'

export interface SelectItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface SelectItemTextProps extends HTMLProps<'span'>, SelectItemTextBaseProps {}

export const SelectItemText = (props: SelectItemTextProps) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => select().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
