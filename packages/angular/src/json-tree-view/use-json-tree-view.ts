import { computed } from '@angular/core'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import {
  createTreeCollection,
  useTreeView,
  type TreeCollection,
  type UseTreeViewProps,
} from '@ark-ui/angular/src/tree-view'
import { getBranchValues } from './get-branch-values'
import type { JsonTreeViewOptions, UseJsonTreeViewReturn } from './json-tree-view.types'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  /** The data to display in the tree. */
  data: unknown
  /** The default depth to expand. */
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewOptions {
  context: () => UseJsonTreeViewProps
}

export function useJsonTreeView(options: UseJsonTreeViewOptions): UseJsonTreeViewReturn {
  const jsonOptions = computed(() => pickJsonOptions(options.context()))
  const collection = computed(() => createJsonTreeCollection(options.context().data, jsonOptions()))

  const treeView = useTreeView<JsonNode>({
    context: () => {
      const props = options.context()
      const {
        data: _data,
        defaultExpandedDepth = 1,
        maxPreviewItems: _maxPreviewItems,
        collapseStringsAfterLength: _collapseStringsAfterLength,
        quotesOnKeys: _quotesOnKeys,
        groupArraysAfterLength: _groupArraysAfterLength,
        showNonenumerable: _showNonenumerable,
        ...treeProps
      } = props
      const defaultExpandedValue = resolveDefaultExpandedValue(
        collection(),
        defaultExpandedDepth,
        treeProps.defaultExpandedValue,
      )

      return {
        ...treeProps,
        collection: collection(),
        defaultExpandedValue,
        typeahead: false,
      }
    },
  })

  return {
    ...treeView,
    options: jsonOptions,
  }
}

function createJsonTreeCollection(data: unknown, options: JsonTreeViewOptions): TreeCollection<JsonNode> {
  return createTreeCollection<JsonNode>({
    nodeToValue,
    nodeToString,
    rootNode: getRootNode(data, options),
  })
}

function resolveDefaultExpandedValue(
  collection: TreeCollection<JsonNode>,
  defaultExpandedDepth: number | undefined,
  defaultExpandedValue: string[] | undefined,
): string[] | undefined {
  if (defaultExpandedValue !== undefined) return defaultExpandedValue
  if (defaultExpandedDepth == null) return undefined
  return getBranchValues(collection, defaultExpandedDepth)
}

function pickJsonOptions(props: JsonTreeViewOptions): JsonTreeViewOptions {
  return {
    maxPreviewItems: props.maxPreviewItems,
    collapseStringsAfterLength: props.collapseStringsAfterLength,
    quotesOnKeys: props.quotesOnKeys,
    groupArraysAfterLength: props.groupArraysAfterLength,
    showNonenumerable: props.showNonenumerable,
  }
}
