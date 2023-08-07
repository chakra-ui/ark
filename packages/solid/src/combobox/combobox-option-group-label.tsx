import type { OptionGroupLabelProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupLabelProps = Assign<HTMLArkProps<'label'>, OptionGroupLabelProps>

export const ComboboxOptionGroupLabel = (props: ComboboxOptionGroupLabelProps) => {
  const [labelParams, restProps] = createSplitProps<OptionGroupLabelProps>()(props, ['htmlFor'])
  const api = useComboboxContext()
  const groupLabelProps = mergeProps(() => api().getOptionGroupLabelProps(labelParams), restProps)

  return <ark.label {...groupLabelProps} />
}
