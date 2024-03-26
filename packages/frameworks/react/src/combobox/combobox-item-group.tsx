import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const ComboboxItemGroup = forwardRef<HTMLDivElement, ComboboxItemGroupProps>(
  (props, ref) => {
    const [itemProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
    const context = useComboboxContext()
    const mergedProps = mergeProps(context.getItemGroupProps(itemProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemGroup.displayName = 'ComboboxItemGroup'
