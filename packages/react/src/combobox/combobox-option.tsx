import type { OptionProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionProps = Assign<ComponentPropsWithoutRef<typeof ark.li>, OptionProps>

export const ComboboxOption = forwardRef<HTMLLIElement, ComboboxOptionProps>((props, ref) => {
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

ComboboxOption.displayName = 'ComboboxOption'
