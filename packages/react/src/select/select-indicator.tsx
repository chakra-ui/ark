import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/select'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectIndicatorProps = ComponentPropsWithoutRef<typeof ark.div> & ItemProps

export const SelectIndicator = forwardRef<HTMLDivElement, SelectIndicatorProps>((props, ref) => {
  const [indicatorProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(api.getItemIndicatorProps(indicatorProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectIndicator.displayName = 'SelectIndicator'
