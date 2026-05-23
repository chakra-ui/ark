import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
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
  extends RootProviderProps<T>, UsePresenceProps, PolymorphicProps {}
export interface CascadeSelectRootProviderProps<T extends TreeNode> extends Assign<
  HTMLProps<'div'>,
  CascadeSelectRootProviderBaseProps<T>
> {}

const CascadeSelectRootProviderImpl = <T extends TreeNode>(
  props: CascadeSelectRootProviderProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [presenceProps, cascadeSelectProps] = splitPresenceProps(props)
  const [{ value: cascadeSelect }, localProps] = createSplitProps<RootProviderProps<T>>()(cascadeSelectProps, ['value'])
  const presence = usePresence(mergeProps({ present: cascadeSelect.open }, presenceProps))
  const mergedProps = mergeProps(cascadeSelect.getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
}

export type CascadeSelectRootProviderComponent<P = {}> = <T extends TreeNode>(
  props: Assign<CascadeSelectRootProviderProps<T>, P> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const CascadeSelectRootProvider = forwardRef(CascadeSelectRootProviderImpl) as CascadeSelectRootProviderComponent
