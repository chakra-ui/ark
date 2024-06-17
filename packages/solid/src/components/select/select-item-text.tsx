import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface SelectItemTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    SelectItemTextBaseProps {}

export const SelectItemText = (props: SelectItemTextProps) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => select().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
