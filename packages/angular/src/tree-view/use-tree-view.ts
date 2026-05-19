import * as treeView from '@zag-js/tree-view'
import type { Machine } from '@zag-js/core'
import type { PropTypes } from '@zag-js/types'
import type { TreeCollection, TreeNode } from '@ark-ui/angular/src/collection'
import { useMachine } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal'
import { injectArkEnvironment } from '@ark-ui/angular/src/providers/environment'
import { injectArkLocale } from '@ark-ui/angular/src/providers/locale'

type OptionalId<T extends { id?: string | undefined }> = Omit<T, 'id'> & { id?: string }

export interface UseTreeViewProps<T extends TreeNode = TreeNode> extends OptionalId<
  Omit<treeView.Props<T>, 'dir' | 'getRootNode' | 'collection'>
> {
  /** The collection of tree nodes. */
  collection: TreeCollection<T>
}

export type UseTreeViewApi<T extends TreeNode = TreeNode> = treeView.Api<PropTypes, T>

export type UseTreeViewReturn<T extends TreeNode = TreeNode> = UseMachineReturn<
  treeView.Service<T>['state'],
  UseTreeViewApi<T>,
  treeView.Service<T>
>

export interface UseTreeViewOptions<T extends TreeNode = TreeNode> {
  context: () => UseTreeViewProps<T>
}

type TreeViewContext = Record<string, unknown>
type TreeViewSchema<T extends TreeNode> = treeView.Machine<T> extends Machine<infer TSchema> ? TSchema : never

export function useTreeView<T extends TreeNode = TreeNode>(options: UseTreeViewOptions<T>): UseTreeViewReturn<T> {
  const locale = injectArkLocale()
  const environment = injectArkEnvironment()
  const fallbackId = createArkId('tree-view')

  return useMachine<TreeViewSchema<T>, UseTreeViewApi<T>>({
    machine: treeView.machine as unknown as Machine<TreeViewSchema<T>>,
    context: () => {
      const props = options.context()
      return {
        ...props,
        dir: locale.dir,
        getRootNode: environment.getRootNode,
        id: props.id ?? fallbackId,
      } as TreeViewContext
    },
    connect: (service, normalize) =>
      treeView.connect(service as unknown as treeView.Service<T>, normalize) as UseTreeViewApi<T>,
  }) as UseTreeViewReturn<T>
}
