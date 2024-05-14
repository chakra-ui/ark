import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseToggleGroupProps, useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

export interface ToggleGroupRootProps extends Assign<HTMLArkProps<'div'>, UseToggleGroupProps> {}

export const ToggleGroupRoot = (props: ToggleGroupRootProps) => {
  const [useToggleGroupProps, restProps] = createSplitProps<UseToggleGroupProps>()(props, [
    'defaultValue',
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

  const api = useToggleGroup(useToggleGroupProps)
  const mergedProps = mergeProps(() => api().rootProps, restProps)

  return (
    <ToggleGroupProvider value={api}>
      <ark.div {...mergedProps} />
    </ToggleGroupProvider>
  )
}
