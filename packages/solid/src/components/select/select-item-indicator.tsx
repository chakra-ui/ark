import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => select().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
