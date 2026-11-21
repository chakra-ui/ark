import { createElement, ChevronRight, Folder, File } from 'lucide'

import '@ark-ui/web/tree-view'

import styles from 'styles/tree-view.module.css'

interface TreeNode {
  value: string
  label: string
  children?: TreeNode[]
}

const files: TreeNode[] = [
  {
    value: 'node_modules',
    label: 'node_modules',
    children: [
      { value: 'node_modules/zag-js', label: 'zag-js' },
      { value: 'node_modules/pandacss', label: 'panda' },
      {
        value: 'node_modules/@types',
        label: '@types',
        children: [
          { value: 'node_modules/@types/react', label: 'react' },
          { value: 'node_modules/@types/react-dom', label: 'react-dom' },
        ],
      },
    ],
  },
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/app.tsx', label: 'app.tsx' },
      { value: 'src/index.ts', label: 'index.ts' },
    ],
  },
  { value: 'panda.config', label: 'panda.config.ts' },
  { value: 'package.json', label: 'package.json' },
  { value: 'renovate.json', label: 'renovate.json' },
  { value: 'readme.md', label: 'README.md' },
]

function inShadowRoot(markup: string, setup?: (root: ShadowRoot) => void) {
  const host = document.createElement('div')
  const root = host.attachShadow({ mode: 'open' })
  for (const style of document.head.querySelectorAll('style, link[rel=stylesheet]')) root.append(style.cloneNode(true))
  const template = document.createElement('template')
  template.innerHTML = markup
  root.append(template.content)
  setup?.(root)
  return host
}

const icon = (node: typeof File) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const text = ({ label, icon: node }: { label: string; icon?: typeof File }) =>
  /* html */ `<ark-tree-view-node-text class="${styles.NodeText}">${node ? icon(node) : ''}${label}</ark-tree-view-node-text>`

const branch = ({ value, label }: TreeNode, children: string[]) => /* html */ `
  <ark-tree-view-node-group class="${styles.NodeGroup}" value="${value}">
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${icon(ChevronRight)}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        ${text({ label, icon: Folder })}
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      ${children.join('')}
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>`

const leaf = ({ value, label }: TreeNode) => /* html */ `
  <ark-tree-view-node class="${styles.Node}" value="${value}">
    <ark-tree-view-cell class="${styles.Cell}">${text({ label, icon: File })}</ark-tree-view-cell>
  </ark-tree-view-node>`

const renderTree = (nodes: TreeNode[]): string[] =>
  nodes.map((node) => (node.children ? branch(node, renderTree(node.children)) : leaf(node)))

export function mount(container: HTMLElement) {
  container.replaceChildren(
    inShadowRoot(/* html */ `
      <ark-tree-view class="${styles.Root}" default-expanded-value="node_modules">
        <ark-tree-view-label class="${styles.Label}">Tree</ark-tree-view-label>
        <ark-tree-view-tree class="${styles.Tree}">${renderTree(files).join('')}</ark-tree-view-tree>
      </ark-tree-view>`),
  )
}
