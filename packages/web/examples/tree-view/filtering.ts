import { createElement, ChevronRight, Check, Minus, Folder, File, ExternalLink } from 'lucide'

import '../../src/components/tree-view/index.js'

import field from 'styles/field.module.css'

import styles from 'styles/tree-view.module.css'

interface Node {
  value: string
  label: string
  disabled?: boolean
  href?: string
  children?: Node[]
}

const files = (disabled: string[] = []): Node[] => {
  const node = (value: string, label: string, children?: Node[]): Node => ({
    value,
    label,
    children,
    disabled: disabled.includes(value) || undefined,
  })
  return [
    node('node_modules', 'node_modules', [
      node('node_modules/zag-js', 'zag-js'),
      node('node_modules/pandacss', 'panda'),
      node('node_modules/@types', '@types', [
        node('node_modules/@types/react', 'react'),
        node('node_modules/@types/react-dom', 'react-dom'),
      ]),
    ]),
    node('src', 'src', [node('src/app.tsx', 'app.tsx'), node('src/index.ts', 'index.ts')]),
    node('panda.config', 'panda.config.ts'),
    node('package.json', 'package.json'),
    node('renovate.json', 'renovate.json'),
    node('readme.md', 'README.md'),
  ]
}

const filterNodes = (items: Node[], query: string): Node[] =>
  items.flatMap((node) => {
    const children = node.children && filterNodes(node.children, query)
    const matches = node.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    return matches || children?.length ? [{ ...node, children }] : []
  })

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack" style="max-width: 20rem">
      <input class="${field.Input}" placeholder="Search" />
      
  <ark-tree-view class="${styles.Root}" >
    
    
    <ark-tree-view-tree class="${styles.Tree}"><template data-branch>
  <ark-tree-view-node-group class="${styles.NodeGroup}"  >
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        
        <ark-tree-view-node-text class="${styles.NodeText}">${createElement(Folder, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-text>
        
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group></template><template>
  <ark-tree-view-node class="${styles.Node}"  >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node></template></ark-tree-view-tree>
  </ark-tree-view>
    </div>`
  const tree = root.querySelector('ark-tree-view')!
  tree.items = files()
  root.querySelector('input')!.addEventListener('input', (event) => {
    const query = (event.target as HTMLInputElement).value
    tree.items = query ? filterNodes(files(), query) : files()
  })
}
