import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import type * as treeView from '@zag-js/tree-view'
import type { JsonNode } from '@zag-js/json-tree-utils'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_TREE_VIEW_CONTEXT, type UseTreeViewApi } from '@ark-ui/angular/src/tree-view'
import type { JsonTreeViewOptions, UseJsonTreeViewReturn } from './json-tree-view.types'
import { ARK_JSON_TREE_VIEW_CONTEXT, ARK_JSON_TREE_VIEW_OPTIONS } from './use-json-tree-view-context'

@Directive({
  selector: '[arkJsonTreeViewRootProvider]',
  standalone: true,
  exportAs: 'arkJsonTreeViewRootProvider',
  providers: [
    { provide: ARK_JSON_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkJsonTreeViewRootProvider) },
    { provide: ARK_TREE_VIEW_CONTEXT, useExisting: forwardRef(() => ArkJsonTreeViewRootProvider) },
    {
      provide: ARK_JSON_TREE_VIEW_OPTIONS,
      useFactory: (provider: ArkJsonTreeViewRootProvider) => provider.options,
      deps: [forwardRef(() => ArkJsonTreeViewRootProvider)],
    },
  ],
})
export class ArkJsonTreeViewRootProvider implements UseJsonTreeViewReturn {
  /** The json tree view machine returned by useJsonTreeView(). */
  readonly value: InputSignal<UseJsonTreeViewReturn> = input.required<UseJsonTreeViewReturn>()

  readonly state: Signal<treeView.Service<JsonNode>['state']> = computed(() => this.value().state())
  readonly api: Signal<UseTreeViewApi<JsonNode>> = computed(() => this.value().api())
  readonly options: Signal<JsonTreeViewOptions> = computed(() => this.value().options())
  readonly send: treeView.Service<JsonNode>['send'] = (event) => this.value().send(event)

  get service(): treeView.Service<JsonNode> {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => ({ ...this.api().getRootProps(), 'data-scope': 'json-tree-view' }),
    })
  }
}
