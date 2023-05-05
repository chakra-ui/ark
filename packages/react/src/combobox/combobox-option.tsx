import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

type OptionProps = Parameters<ReturnType<typeof useComboboxContext>['getOptionProps']>[0]

export type ComboboxOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const ComboboxOption = forwardRef<'li', ComboboxOptionProps>((props, ref) => {
  const [optionProps, { children, ...liProps }] = createSplitProps<OptionProps>()(props, [
    'count',
    'disabled',
    'label',
    'value',
    'index',
  ])

  const { getOptionProps } = useComboboxContext()
  const mergedProps = mergeProps(getOptionProps(optionProps), liProps)

  return (
    <ark.li {...mergedProps} ref={ref}>
      {children ? children : optionProps.label}
    </ark.li>
  )
})
