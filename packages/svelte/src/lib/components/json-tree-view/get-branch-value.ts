import type { TreeCollection } from '@zag-js/collection'
import type { JsonNode } from '@zag-js/json-tree-utils'

export function getBranchValues(tree: TreeCollection<JsonNode>, depth: number) {
  let values: string[] = []
  tree.visit({
    onEnter: (node, indexPath) => {
      if (indexPath.length === 0) return
      if (tree.isBranchNode(node) && indexPath.length <= depth) {
        values.push(tree.getNodeValue(node))
      }
    },
  })
  return values
}
