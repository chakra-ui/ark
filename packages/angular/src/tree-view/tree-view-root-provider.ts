import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as treeView from '@zag-js/tree-view'
import type { TreeNode } from '@ark-ui/angular/src/collection'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, type ArkContextCarrier } from '@ark-ui/angular/src/internal'
import { ARK_TREE_VIEW_CONTEXT } from './use-tree-view-context'
import type { UseTreeViewApi, UseTreeViewReturn } from './use-tree-view'

@Directive({
  selector: '[arkTreeViewRootProvider]',
  standalone: true,
  exportAs: 'arkTreeViewRootProvider',
  providers: [{ provide: ARK_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkTreeViewRootProvider) }],
})
export class ArkTreeViewRootProvider<T extends TreeNode = TreeNode> implements UseTreeViewReturn<T> {
  /** The tree view machine returned by useTreeView(). */
  readonly value: InputSignal<UseTreeViewReturn<T>> = input.required<UseTreeViewReturn<T>>()
  readonly state: Signal<treeView.Service<T>['state']> = computed(() => this.value().state())
  readonly api: Signal<UseTreeViewApi<T>> = computed(() => this.value().api())
  readonly send: treeView.Service<T>['send'] = (event) => this.value().send(event)

  get service(): treeView.Service<T> {
    return this.value().service
  }

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTreeViewRootProvider<T>> = buildRootCarrier<
    ArkTreeViewRootProvider<T>
  >({
    root: this,
    rootToken: ARK_TREE_VIEW_CONTEXT as ProviderToken<ArkTreeViewRootProvider<T>>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  /** @internal Exposed for recursive or dynamic tree-view templates. */
  getContextCarrier(): ArkContextCarrier<ArkTreeViewRootProvider<T>> {
    return this.arkContextCarrier
  }
}
