import type { OptionProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionProps = Assign<HTMLArkProps<'div'>, OptionProps>

export const ComboboxOption = (props: ComboboxOptionProps) => {
  const [optionProps, localProps] = createSplitProps<OptionProps>()(props, [
    'count',
    'disabled',
    'label',
    'value',
    'index',
  ])

  const [childrenProps, restProps] = splitProps(localProps, ['children'])

  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getOptionProps(optionProps), restProps)

  return <ark.div {...mergedProps}>{childrenProps.children || optionProps.label}</ark.div>
}
