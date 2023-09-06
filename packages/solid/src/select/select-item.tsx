import type { ItemProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemProps = Assign<HTMLArkProps<'div'>, ItemProps>

export const SelectItem = (props: SelectItemProps) => {
  const [optionParams, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemProps(optionParams), localProps)

  return <ark.div {...mergedProps} />
}
