import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

type GroupLabelParams = { htmlFor: string }
export type SelectOptionGroupLabelProps = Assign<HTMLArkProps<'label'>, GroupLabelParams>

export const SelectOptionGroupLabel = (props: SelectOptionGroupLabelProps) => {
  const [labelParams, restProps] = createSplitProps<GroupLabelParams>()(props, ['htmlFor'])
  const api = useSelectContext()
  const groupLabelProps = mergeProps(() => api().getOptionGroupLabelProps(labelParams), restProps)
  return <ark.label {...groupLabelProps} />
}
