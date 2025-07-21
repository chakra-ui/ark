import type { JsonNodePreviewOptions } from '@zag-js/json-tree-utils'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface JsonTreeViewOptions extends Partial<JsonNodePreviewOptions> {
  /**
   * Whether to show quotes on the keys.
   */
  quotesOnKeys?: boolean
}

export const [JsonTreeViewPropsProvider, useJsonTreeViewPropsContext] =
  createContext<ComputedRef<JsonTreeViewOptions>>('JsonTreeViewPropsContext')
