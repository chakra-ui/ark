import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { ToggleGroupProvider } from './toggle-group-context'
import { useToggleGroup, type UseToggleGroupProps } from './use-toggle-group'

export interface ToggleGroupRootProps extends Assign<HTMLArkProps<'div'>, UseToggleGroupProps> {}

export const ToggleGroupRoot = forwardRef<HTMLDivElement, ToggleGroupRootProps>((props, ref) => {
  const [toggleGroup, localProps] = createSplitProps<UseToggleGroupProps>()(props, [
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'multiple',
    'onValueChange',
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

ToggleGroupRoot.displayName = 'ToggleGroupRoot'
