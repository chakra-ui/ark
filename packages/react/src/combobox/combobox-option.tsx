import type { OptionProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionProps = Assign<HtmlArkProps<'div'>, OptionProps>

export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>((props, ref) => {
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
    <ark.div {...mergedProps} ref={ref}>
      {children ? children : optionProps.label}
    </ark.div>
  )
})

ComboboxOption.displayName = 'ComboboxOption'
