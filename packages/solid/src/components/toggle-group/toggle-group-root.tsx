import { mergeProps } from '@zag-js/solid'
import type { RootState } from '@zag-js/toggle-group'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseToggleGroupProps, useToggleGroup } from './use-toggle-group.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'

export interface ToggleGroupRootState extends RootState {}

export interface ToggleGroupRootBaseProps extends UseToggleGroupProps, PolymorphicProps<'div', ToggleGroupRootState> {}
export interface ToggleGroupRootProps extends HTMLProps<'div'>, ToggleGroupRootBaseProps {}

export const ToggleGroupRoot = (props: ToggleGroupRootProps) => {
  const [useToggleGroupProps, restProps] = createSplitProps<UseToggleGroupProps>()(props, [
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

  const api = useToggleGroup(useToggleGroupProps)
  const mergedProps = mergeProps(() => api().getRootProps(), restProps)

  return (
    <ToggleGroupProvider value={api}>
      <ark.div {...mergedProps} state={api().getRootState()} />
    </ToggleGroupProvider>
  )
}
