import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseToggleGroupProps, useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

export interface ToggleGroupRootBaseProps extends UseToggleGroupProps, PolymorphicProps<'div'> {}
export interface ToggleGroupRootProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ToggleGroupRootBaseProps {}

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
  const mergedProps = mergeProps(() => api().getRootProps(), restProps)

  return (
    <ToggleGroupProvider value={api}>
      <ark.div {...mergedProps} />
    </ToggleGroupProvider>
  )
}
