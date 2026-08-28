import type { Root } from 'mdast'

export default function remarkRemoveFirstHeading() {
  return (tree: Root) => {
    const index = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1)
    if (index !== -1) {
      tree.children.splice(index, 1)
    }
  }
}
