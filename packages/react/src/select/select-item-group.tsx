import { mergeProps } from '@zag-js/react'
import type { ItemGroupProps } from '@zag-js/select'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectItemGroupProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, ItemGroupProps>

export const SelectItemGroup = forwardRef<HTMLDivElement, SelectItemGroupProps>((props, ref) => {
  const [itemPropsProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
  const api = useSelectContext()
  const mergedProps = mergeProps(api.getItemGroupProps(itemPropsProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectItemGroup.displayName = 'SelectItemGroup'
