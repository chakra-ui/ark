import type { OptionProps } from '@zag-js/combobox/dist/combobox.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const ComboboxOption = forwardRef<'li', OptionProps>((props, ref) => {
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
