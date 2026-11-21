import { createElement, ChevronRight, Folder, File } from 'lucide'

import '../../src/components/tree-view/index.js'

import styles from 'styles/tree-view.module.css'

interface TreeNode {
  value: string
  label: string
  children?: TreeNode[]
}

const icon = (node: typeof File) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const treeView = (
  { data, defaultExpandedValue }: { data: TreeNode[]; defaultExpandedValue?: string },
  children: string[],
) => /* html */ `
  <ark-tree-view class="${styles.Root}" ${defaultExpandedValue ? `default-expanded-value="${defaultExpandedValue}"` : ''}>
    <script type="application/json">${JSON.stringify(data)}</script>
    <ark-tree-view-label class="${styles.Label}">Tree</ark-tree-view-label>
    <ark-tree-view-tree class="${styles.Tree}">${children.join('')}</ark-tree-view-tree>
  </ark-tree-view>`

const branchTemplate = /* html */ `
  <template data-branch>
    <ark-tree-view-node-group class="${styles.NodeGroup}">
      <ark-tree-view-node class="${styles.Node}">
        <ark-tree-view-cell class="${styles.Cell}">
          <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
            <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${icon(ChevronRight)}</ark-tree-view-node-indicator>
          </ark-tree-view-node-expand-trigger>
          <ark-tree-view-node-text class="${styles.NodeText}">${icon(Folder)}</ark-tree-view-node-text>
        </ark-tree-view-cell>
      </ark-tree-view-node>
      <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
        <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      </ark-tree-view-node-group-content>
    </ark-tree-view-node-group>
  </template>`

const leafTemplate = /* html */ `
  <template>
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${icon(File)}</ark-tree-view-node-text></ark-tree-view-cell>
    </ark-tree-view-node>
  </template>`

export function mount(root: HTMLElement) {
  const folders = Array.from({ length: 20 }, (_, i) => `folder-${i}`)
  const data: TreeNode[] = folders.map((folder) => ({
    value: folder,
    label: folder,
    children: Array.from({ length: 50 }, (_, j) => ({ value: `${folder}/file-${j}.ts`, label: `file-${j}.ts` })),
  }))
  root.innerHTML = treeView({ data, defaultExpandedValue: folders.join(',') }, [branchTemplate, leafTemplate])
}
