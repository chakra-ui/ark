import type { ItemGroupLabelProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export interface ComboboxItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const ComboboxItemGroupLabel = forwardRef<HTMLDivElement, ComboboxItemGroupLabelProps>(
  (props, ref) => {
    const [optionProps, localProps] = createSplitProps<ItemGroupLabelProps>()(props, ['htmlFor'])

    const api = useComboboxContext()
    const mergedProps = mergeProps(api.getItemGroupLabelProps(optionProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemGroupLabel.displayName = 'ComboboxItemGroupLabel'
