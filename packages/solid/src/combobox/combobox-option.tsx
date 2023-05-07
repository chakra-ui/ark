import { mergeProps } from '@zag-js/solid'
import { createMemo, splitProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

type OptionProps = Parameters<
  ReturnType<ReturnType<typeof useComboboxContext>>['getOptionProps']
>[0]

export type ComboboxOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const ComboboxOption = (props: ComboboxOptionProps) => {
  const [optionProps, localProps] = createSplitProps<OptionProps>()(props, [
    'count',
    'disabled',
    'label',
    'value',
    'index',
  ])
  const [childrenProps, liProps] = splitProps(localProps, ['children'])
  const combobox = useComboboxContext()
  const mergedProps = createMemo(() => mergeProps(combobox().getOptionProps(optionProps), liProps))
  return <ark.li {...mergedProps()}>{childrenProps.children || optionProps.label}</ark.li>
}
