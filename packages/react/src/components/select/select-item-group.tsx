'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemGroupProps } from '@zag-js/select'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { SelectItemGroupPropsProvider } from './use-select-item-group-props.tsx'

export interface SelectItemGroupBaseProps extends PolymorphicProps {}
export interface SelectItemGroupProps extends HTMLProps<'div'>, SelectItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<Partial<ItemGroupProps>>()

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>((props, ref) => {
  const id = useId()
  const [_itemGroupProps, localProps] = splitItemGroupProps(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const select = useSelectContext()
  const mergedProps = mergeProps(select.getItemGroupProps(itemGroupProps), localProps)

  return (
    <SelectItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </SelectItemGroupPropsProvider>
  )
})

SelectItemGroup.displayName = 'SelectItemGroup'
