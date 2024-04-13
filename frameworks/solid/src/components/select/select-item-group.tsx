import type { ItemGroupProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useSelectContext } from './use-select-context'

export interface SelectItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const SelectItemGroup = (props: SelectItemGroupProps) => {
  const [itemGroupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemGroupProps(itemGroupProps), localProps)

  return <ark.div {...mergedProps} />
}
