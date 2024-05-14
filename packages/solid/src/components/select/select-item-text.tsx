import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-props-context'

export interface SelectItemTextProps extends HTMLArkProps<'span'> {}

export const SelectItemText = (props: SelectItemTextProps) => {
  const select = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => select().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
