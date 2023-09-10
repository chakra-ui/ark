import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { ToggleGroupProvider } from './toggle-group-context'
import { useToggleGroup, type UseToggleGroupProps } from './use-toggle-group'

export type ToggleGroupProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, UseToggleGroupProps>

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>((props, ref) => {
  const [toggleGroup, localProps] = createSplitProps<UseToggleGroupProps>()(props, [
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'multiple',
    'onChange',
    'orientation',
    'rovingFocus',
    'value',
  ])
  const api = useToggleGroup(toggleGroup)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <ToggleGroupProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </ToggleGroupProvider>
  )
})

ToggleGroup.displayName = 'ToggleGroup'
