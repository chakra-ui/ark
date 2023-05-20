import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

type OptionParams = Parameters<ReturnType<ReturnType<typeof useSelectContext>>['getOptionProps']>[0]

export type SelectOptionProps = Assign<HTMLArkProps<'li'>, OptionParams>

export const SelectOption = (props: SelectOptionProps) => {
  const [optionParams, restProps] = createSplitProps<OptionParams>()(props, [
    'disabled',
    'label',
    'value',
    'valueText',
  ])

  const api = useSelectContext()

  const optionProps = mergeProps(() => api().getOptionProps(optionParams), restProps)

  return <ark.li {...optionProps}>{restProps.children ?? optionParams.label}</ark.li>
}
