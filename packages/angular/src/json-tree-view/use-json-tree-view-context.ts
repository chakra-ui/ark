import { InjectionToken, inject } from '@angular/core'
import type { JsonTreeViewOptions, UseJsonTreeViewReturn } from './json-tree-view.types'

export const ARK_JSON_TREE_VIEW_CONTEXT = new InjectionToken<UseJsonTreeViewReturn>('ARK_JSON_TREE_VIEW_CONTEXT')

export function injectArkJsonTreeViewContext(): UseJsonTreeViewReturn {
  return inject(ARK_JSON_TREE_VIEW_CONTEXT)
}

export const ARK_JSON_TREE_VIEW_OPTIONS = new InjectionToken<() => JsonTreeViewOptions>('ARK_JSON_TREE_VIEW_OPTIONS')

export function injectArkJsonTreeViewOptions(): () => JsonTreeViewOptions {
  return inject(ARK_JSON_TREE_VIEW_OPTIONS)
}
