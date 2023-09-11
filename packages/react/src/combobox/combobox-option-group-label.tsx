import type { OptionGroupLabelProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxOptionGroupLabelProps = Assign<HTMLArkProps<'div'>, OptionGroupLabelProps>

export const ComboboxOptionGroupLabel = forwardRef<HTMLDivElement, ComboboxOptionGroupLabelProps>(
  (props, ref) => {
    const [optionProps, labelProps] = createSplitProps<OptionGroupLabelProps>()(props, ['htmlFor'])

    const { getOptionGroupLabelProps } = useComboboxContext()
    const mergedProps = mergeProps(getOptionGroupLabelProps(optionProps), labelProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxOptionGroupLabel.displayName = 'ComboboxOptionGroupLabel'
