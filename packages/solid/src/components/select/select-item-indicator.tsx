import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface SelectItemIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    SelectItemIndicatorBaseProps {}

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => select().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
