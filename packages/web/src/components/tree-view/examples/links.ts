import { createElement, ChevronRight, File, ExternalLink } from 'lucide'

import '@ark-ui/web/tree-view'

import styles from 'styles/tree-view.module.css'

interface TreeNode {
  value: string
  label: string
  href?: string
  children?: TreeNode[]
}

const docs: TreeNode[] = [
  {
    value: 'docs',
    label: 'Documentation',
    children: [
      { value: 'docs/getting-started', label: 'Getting Started', href: '/docs/getting-started' },
      { value: 'docs/installation', label: 'Installation', href: '/docs/installation' },
      {
        value: 'docs/components',
        label: 'Components',
        children: [
          { value: 'docs/components/accordion', label: 'Accordion', href: '/docs/components/accordion' },
          { value: 'docs/components/dialog', label: 'Dialog', href: '/docs/components/dialog' },
          { value: 'docs/components/menu', label: 'Menu', href: '/docs/components/menu' },
        ],
      },
    ],
  },
  {
    value: 'examples',
    label: 'Examples',
    children: [
      { value: 'examples/react', label: 'React Examples', href: '/examples/react' },
      { value: 'examples/vue', label: 'Vue Examples', href: '/examples/vue' },
      { value: 'examples/solid', label: 'Solid Examples', href: '/examples/solid' },
    ],
  },
  {
    value: 'external',
    label: 'External Links',
    children: [
      { value: 'external/github', label: 'GitHub Repository', href: 'https://github.com/chakra-ui/zag' },
      { value: 'external/npm', label: 'NPM Package', href: 'https://www.npmjs.com/package/@zag-js/core' },
      { value: 'external/docs', label: 'Official Docs', href: 'https://zagjs.com' },
    ],
  },
  { value: 'readme.md', label: 'README.md', href: '/readme' },
  { value: 'license', label: 'LICENSE', href: '/license' },
]

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
        ${text({ label })}
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      ${children.join('')}
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>`

const leaf = ({ value, label, href = '' }: TreeNode) => /* html */ `
  <ark-tree-view-node class="${styles.Node}" value="${value}">
    <ark-tree-view-cell>
      <a class="${styles.Cell}" href="${href}">${text({ label, icon: File })}${href.startsWith('http') ? icon(ExternalLink) : ''}</a>
    </ark-tree-view-cell>
  </ark-tree-view-node>`

const renderTree = (nodes: TreeNode[]): string[] =>
  nodes.map((node) => (node.children ? branch(node, renderTree(node.children)) : leaf(node)))

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-tree-view class="${styles.Root}">
      <ark-tree-view-label class="${styles.Label}">Docs</ark-tree-view-label>
      <ark-tree-view-tree class="${styles.Tree}">${renderTree(docs).join('')}</ark-tree-view-tree>
    </ark-tree-view>`
}
