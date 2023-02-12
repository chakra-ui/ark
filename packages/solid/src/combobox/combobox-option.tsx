import type { Assign } from '@polymorphic-factory/solid'
import { mergeProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

type OptionProps = Parameters<
  ReturnType<ReturnType<typeof useComboboxContext>>['getOptionProps']
>[0]

export type ComboboxOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const ComboboxOption = (props: ComboboxOptionProps) => {
  const [optionProps, { children, ...liProps }] = createSplitProps<OptionProps>()(props, [
    'count',
    'disabled',
    'label',
    'value',
    'index',
  ])

  const combobox = useComboboxContext()
  const mergedProps = () => mergeProps(combobox().getOptionProps(optionProps), liProps)

  return <ark.li {...mergedProps()}>{children ? children : optionProps.label}</ark.li>
}
