import type { OptionProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionProps = Assign<HTMLArkProps<'div'>, OptionProps>

export const SelectOption = (props: SelectOptionProps) => {
  const [optionParams, restProps] = createSplitProps<OptionProps>()(props, [
    'disabled',
    'label',
    'value',
    'valueText',
  ])
  const api = useSelectContext()
  const optionProps = mergeProps(() => api().getOptionProps(optionParams), restProps)

  return <ark.div {...optionProps}>{restProps.children ?? optionParams.label}</ark.div>
}
