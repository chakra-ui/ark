import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

type OptionGroupParams = { id: string }
export type SelectOptionGroupProps = Assign<HTMLArkProps<'div'>, OptionGroupParams>

export const SelectOptionGroup = (props: SelectOptionGroupProps) => {
  const [optionGroupParams, restProps] = createSplitProps<OptionGroupParams>()(props, ['id'])
  const api = useSelectContext()
  const groupProps = mergeProps(() => api().getOptionGroupProps(optionGroupParams), restProps)
  return <ark.div {...groupProps} />
}
