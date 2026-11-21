import {
  GridVirtualizer,
  type GridVirtualizerOptions,
  ListVirtualizer,
  type ListVirtualizerOptions,
  WindowVirtualizer,
  type WindowVirtualizerOptions,
} from '@zag-js/virtualizer'

import { type VirtualizerLifecycle, withLifecycle } from './lifecycle.js'

export type {
  CSSProperties as VirtualizerCSSProperties,
  ScrollToIndexOptions,
  VirtualColumn,
  VirtualItem,
  VirtualRow,
} from '@zag-js/virtualizer'
export type { VirtualizerLifecycle } from './lifecycle.js'
export { renderVirtualItems, spreadVirtualizerProps, type VirtualizerProps } from './render.js'

export interface CreateListVirtualizerOptions extends ListVirtualizerOptions {}
export type CreateListVirtualizerReturn = ListVirtualizer & VirtualizerLifecycle

export function createListVirtualizer(options: CreateListVirtualizerOptions): CreateListVirtualizerReturn {
  return withLifecycle(new ListVirtualizer(options))
}

export interface CreateGridVirtualizerOptions extends GridVirtualizerOptions {}
export type CreateGridVirtualizerReturn = GridVirtualizer & VirtualizerLifecycle

export function createGridVirtualizer(options: CreateGridVirtualizerOptions): CreateGridVirtualizerReturn {
  return withLifecycle(new GridVirtualizer(options))
}

export interface CreateWindowVirtualizerOptions extends WindowVirtualizerOptions {}
export type CreateWindowVirtualizerReturn = WindowVirtualizer & VirtualizerLifecycle

export function createWindowVirtualizer(options: CreateWindowVirtualizerOptions): CreateWindowVirtualizerReturn {
  return withLifecycle(new WindowVirtualizer(options))
}
