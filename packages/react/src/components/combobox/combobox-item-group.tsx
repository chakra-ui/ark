'use client'

import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context.ts'

export interface ComboboxItemGroupBaseProps extends PolymorphicProps {}
export interface ComboboxItemGroupProps extends HTMLProps<'div'>, ComboboxItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<Partial<ItemGroupProps>>()

export const ComboboxItemGroup = forwardRef<HTMLDivElement, ComboboxItemGroupProps>((props, ref) => {
  const id = useId()
  const [_itemGroupProps, localProps] = splitItemGroupProps(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getItemGroupProps(itemGroupProps), localProps)

  return (
    <ComboboxItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ComboboxItemGroupPropsProvider>
  )
})

ComboboxItemGroup.displayName = 'ComboboxItemGroup'
