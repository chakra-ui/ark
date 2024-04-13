import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const ComboboxItemGroup = forwardRef<HTMLDivElement, ComboboxItemGroupProps>(
  (props, ref) => {
    const [itemProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
    const combobox = useComboboxContext()
    const mergedProps = mergeProps(combobox.getItemGroupProps(itemProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxItemGroup.displayName = 'ComboboxItemGroup'
