'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemProps, ItemState } from '@zag-js/toggle-group'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useToggleGroupContext } from './use-toggle-group-context.ts'

export interface ToggleGroupItemState extends ItemState {}

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps<ToggleGroupItemState> {}
export interface ToggleGroupItemProps extends Assign<HTMLProps<'button'>, ToggleGroupItemBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['value', 'disabled'])
  const toggleGroup = useToggleGroupContext()
  const mergedProps = mergeProps(toggleGroup.getItemProps(itemProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={toggleGroup.getItemState(itemProps)} />
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
