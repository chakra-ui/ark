import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ToggleGroupProvider } from './toggle-group-context'
import { useToggleGroup, type UseToggleGroupProps } from './use-toggle-group'

export interface ToggleGroupProps extends Assign<HTMLArkProps<'div'>, UseToggleGroupProps> {}

export const ToggleGroup = (props: ToggleGroupProps) => {
  const [groupParams, restProps] = createSplitProps<UseToggleGroupProps>()(props, [
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

  const api = useToggleGroup(groupParams)
  const rootProps = mergeProps(() => api().rootProps, restProps)

  return (
    <ToggleGroupProvider value={api}>
      <ark.div {...rootProps} />
    </ToggleGroupProvider>
  )
}
