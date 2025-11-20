import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseToggleGroupProps, useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

export interface ToggleGroupRootBaseProps extends UseToggleGroupProps, PolymorphicProps {}
export interface ToggleGroupRootProps extends Assign<HTMLProps<'div'>, ToggleGroupRootBaseProps> {}

const splitRootProps = createSplitProps<UseToggleGroupProps>()

export const ToggleGroupRoot = forwardRef<HTMLDivElement, ToggleGroupRootProps>((props, ref) => {
  const [useToggleGroupProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'deselectable',
    'disabled',
    'id',
    'ids',
    'loopFocus',
    'multiple',
    'onValueChange',
    'orientation',
    'rovingFocus',
    'value',
  ])
  const togglegroup = useToggleGroup(useToggleGroupProps)
  const mergedProps = mergeProps(togglegroup.getRootProps(), localProps)

  return (
    <ToggleGroupProvider value={togglegroup}>
      <ark.div {...mergedProps} ref={ref} />
    </ToggleGroupProvider>
  )
})

ToggleGroupRoot.displayName = 'ToggleGroupRoot'
