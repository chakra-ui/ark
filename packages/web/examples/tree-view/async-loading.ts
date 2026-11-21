import { createTreeCollection } from '../../src/components/tree-view/index.js'

import styles from 'styles/tree-view.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-tree-view class="${styles.Root}">
      <ark-tree-view-label class="${styles.Label}">Project files</ark-tree-view-label>
      <ark-tree-view-tree class="${styles.Tree}">
        <template data-branch>
          <ark-tree-view-node-group class="${styles.NodeGroup}">
            <ark-tree-view-node class="${styles.Node}">
              <ark-tree-view-cell class="${styles.Cell}">
                <ark-tree-view-node-expand-trigger>
                  <ark-tree-view-node-text class="${styles.NodeText}"></ark-tree-view-node-text>
                </ark-tree-view-node-expand-trigger>
              </ark-tree-view-cell>
            </ark-tree-view-node>
            <ark-tree-view-node-group-content class="${styles.NodeGroupContent}"></ark-tree-view-node-group-content>
          </ark-tree-view-node-group>
        </template>
        <template>
          <ark-tree-view-node class="${styles.Node}">
            <ark-tree-view-cell class="${styles.Cell}">
              <ark-tree-view-node-text class="${styles.NodeText}"></ark-tree-view-node-text>
            </ark-tree-view-cell>
          </ark-tree-view-node>
        </template>
      </ark-tree-view-tree>
      <output aria-live="polite">Expand src to load its files.</output>
    </ark-tree-view>
  `
  const tree = root.querySelector('ark-tree-view')!
  tree.collection = createTreeCollection({
    rootNode: { value: 'ROOT', label: '', children: [{ value: 'src', label: 'src', childrenCount: 1 }] },
  })
  tree.loadChildren = async ({ node, signal }) => {
    root.querySelector('output')!.textContent = 'Loading…'
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(resolve, 300)
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timeout)
          reject(signal.reason)
        },
        { once: true },
      )
    })
    return [{ value: `${node.value}/index.ts`, label: 'index.ts', disabled: false }]
  }
  tree.addEventListener('loadchildrencomplete', (event) => {
    tree.collection = event.detail.collection
    root.querySelector('output')!.textContent = 'Files loaded.'
  })
  tree.addEventListener('loadchildrenerror', () => {
    root.querySelector('output')!.textContent = 'Could not load files. Try expanding the folder again.'
  })
}
