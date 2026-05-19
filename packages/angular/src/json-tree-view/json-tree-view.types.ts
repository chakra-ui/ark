import type { JsonNode, JsonNodeHastElement, JsonNodePreviewOptions, JsonNodeText } from '@zag-js/json-tree-utils'
import type {
  TreeViewCheckedChangeDetails,
  TreeViewElementIds,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewSelectionChangeDetails,
  TreeViewService,
  UseTreeViewApi,
  UseTreeViewReturn,
} from '@ark-ui/angular/tree-view'

export interface JsonTreeViewOptions extends Partial<JsonNodePreviewOptions> {
  /** Whether to show quotes on object keys. */
  quotesOnKeys?: boolean
}

export interface JsonTreeViewValueTemplate {
  $implicit: JsonNodeHastElement
  node: JsonNodeHastElement
  text: JsonNodeText | null
}

export type JsonTreeViewNode = JsonNode
export type JsonTreeViewValueNode = JsonNodeHastElement
export type JsonTreeViewApi = UseTreeViewApi<JsonNode>
export type JsonTreeViewService = TreeViewService<JsonNode>
export type JsonTreeViewExpandedChangeDetails = TreeViewExpandedChangeDetails<JsonNode>
export type JsonTreeViewSelectionChangeDetails = TreeViewSelectionChangeDetails<JsonNode>
export type JsonTreeViewCheckedChangeDetails = TreeViewCheckedChangeDetails
export type JsonTreeViewFocusChangeDetails = TreeViewFocusChangeDetails<JsonNode>
export type JsonTreeViewElementIds = TreeViewElementIds

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {
  readonly options: () => JsonTreeViewOptions
}
