import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

interface RootProviderProps {
  value: UseTreeViewReturn
}

export interface TreeViewRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const TreeViewRootProvider = forwardRef<HTMLDivElement, TreeViewRootProviderProps>(
  (props, ref) => {
    const [{ value: treeView }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(treeView.rootProps, localProps)

    return (
      <TreeViewProvider value={treeView}>
        <ark.div {...mergedProps} ref={ref} />
      </TreeViewProvider>
    )
  },
)

TreeViewRootProvider.displayName = 'TreeViewRootProvider'
