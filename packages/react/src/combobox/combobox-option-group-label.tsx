import type { OptionGroupLabelProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupLabelProps = Assign<
  ComponentPropsWithoutRef<typeof ark.label>,
  OptionGroupLabelProps
>

export const ComboboxOptionGroupLabel = forwardRef<HTMLLabelElement, ComboboxOptionGroupLabelProps>(
  (props, ref) => {
    const [optionProps, labelProps] = createSplitProps<OptionGroupLabelProps>()(props, ['htmlFor'])

    const { getOptionGroupLabelProps } = useComboboxContext()
    const mergedProps = mergeProps(getOptionGroupLabelProps(optionProps), labelProps)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

ComboboxOptionGroupLabel.displayName = 'ComboboxOptionGroupLabel'
