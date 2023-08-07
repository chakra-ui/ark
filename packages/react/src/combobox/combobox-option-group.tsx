import type { OptionGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  OptionGroupProps
>

export const ComboboxOptionGroup = forwardRef<HTMLDivElement, ComboboxOptionGroupProps>(
  (props, ref) => {
    const [optionProps, localProps] = createSplitProps<OptionGroupProps>()(props, ['id'])
    const { getOptionGroupProps } = useComboboxContext()
    const mergedProps = mergeProps(getOptionGroupProps(optionProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxOptionGroup.displayName = 'ComboboxOptionGroup'
