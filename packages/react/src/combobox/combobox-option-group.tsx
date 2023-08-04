import type { OptionGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupProps = Assign<
  ComponentPropsWithoutRef<typeof ark.ul>,
  OptionGroupProps
>

export const ComboboxOptionGroup = forwardRef<HTMLUListElement, ComboboxOptionGroupProps>(
  (props, ref) => {
    const [optionProps, { children, ...liProps }] = createSplitProps<OptionGroupProps>()(props, [
      'label',
    ])

    const { getOptionGroupProps } = useComboboxContext()
    const mergedProps = mergeProps(getOptionGroupProps(optionProps), liProps)

    return (
      <ark.ul {...mergedProps} ref={ref}>
        {children ? children : optionProps.label}
      </ark.ul>
    )
  },
)

ComboboxOptionGroup.displayName = 'ComboboxOptionGroup'
