import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import type { UseCascadeSelectReturn } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'

interface RootProviderProps<T extends TreeNode> {
  value: UseCascadeSelectReturn<T>
}

export interface CascadeSelectRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps<'div'> {}
export interface CascadeSelectRootProviderProps<T extends TreeNode> extends Assign<
  HTMLProps<'div'>,
  CascadeSelectRootProviderBaseProps<T>
> {}

export const CascadeSelectRootProvider = <T extends TreeNode>(props: CascadeSelectRootProviderProps<T>) => {
  const [presenceProps, cascadeSelectProps] = splitPresenceProps(props)
  const [{ value: cascadeSelect }, localProps] = createSplitProps<RootProviderProps<T>>()(cascadeSelectProps, ['value'])
  const presenceApi = usePresence(mergeProps(() => ({ present: cascadeSelect().open }), presenceProps))
  const mergedProps = mergeProps(() => cascadeSelect().getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
}

export type CascadeSelectRootProviderComponent<P = {}> = <T extends TreeNode>(
  props: Assign<CascadeSelectRootProviderProps<T>, P>,
) => JSX.Element
