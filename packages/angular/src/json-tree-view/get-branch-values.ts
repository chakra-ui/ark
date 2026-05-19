import type { TreeCollection } from '@ark-ui/angular/tree-view'
import type { JsonNode } from '@zag-js/json-tree-utils'

export function getBranchValues(collection: TreeCollection<JsonNode>, depth: number): string[] {
  const values: string[] = []

  collection.visit({
    onEnter: (node, indexPath) => {
      if (indexPath.length === 0) return
      if (collection.isBranchNode(node) && indexPath.length <= depth) {
        values.push(collection.getNodeValue(node))
      }
    },
  })

  return values
}
