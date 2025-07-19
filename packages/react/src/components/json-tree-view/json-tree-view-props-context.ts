import type { JsonNodePreviewOptions } from '@zag-js/json-tree-utils'
import { createContext } from '../../utils/create-context'

export interface JsonTreeViewOptions extends Partial<JsonNodePreviewOptions> {
  /**
   * Whether to show quotes on the keys.
   */
  quotesOnKeys?: boolean
}

export const [JsonTreeViewPropsProvider, useJsonTreeViewPropsContext] = createContext<JsonTreeViewOptions>({
  name: 'JsonTreeViewPropsContext',
  hookName: 'useJsonTreeViewPropsContext',
  providerName: '<JsonTreeViewPropsProvider />',
})
