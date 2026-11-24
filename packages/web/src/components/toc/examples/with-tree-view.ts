import { ChevronRight, createElement } from 'lucide'

import '@ark-ui/web/toc'
import '@ark-ui/web/tree-view'

import styles from 'styles/toc.module.css'
import tree from 'styles/tree-view.module.css'

interface Section {
  id: string
  name: string
  depth: number
  lines: number
  children?: Section[]
}

const sections: Section[] = [
  {
    id: '09-guides',
    name: 'Guides',
    depth: 2,
    lines: 10,
    children: [
      { id: '09-quick-start', name: 'Quick Start', depth: 3, lines: 6 },
      { id: '09-manual-setup', name: 'Manual Setup', depth: 3, lines: 5 },
    ],
  },
  {
    id: '09-core-concepts',
    name: 'Core Concepts',
    depth: 2,
    lines: 9,
    children: [
      { id: '09-toc-props', name: 'Props', depth: 3, lines: 7 },
      { id: '09-toc-events', name: 'Events', depth: 3, lines: 6 },
      { id: '09-toc-context', name: 'Context', depth: 3, lines: 8 },
    ],
  },
  {
    id: '09-advanced',
    name: 'Advanced',
    depth: 2,
    lines: 11,
    children: [
      { id: '09-root-api', name: 'Root Provider', depth: 3, lines: 7 },
      { id: '09-custom-rendering', name: 'Custom Rendering', depth: 3, lines: 6 },
    ],
  },
]

const chevron = createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const heading = (node: Section, tag: string) => /* html */ `
  <${tag} id="${node.id}" class="${styles.Heading}" data-depth="${node.depth}">${node.name}</${tag}>
  <div class="${styles.DummyText}">${`<div class="${styles.DummyLine}"></div>`.repeat(node.lines)}</div>`

const link = (node: Section) => /* html */ `
  <ark-toc-item value="${node.id}" depth="${node.depth}">
    <ark-toc-link><a class="${styles.TreeLink}" href="#${node.id}">${node.name}</a></ark-toc-link>
  </ark-toc-item>`

const leaf = (node: Section) => /* html */ `
  <ark-tree-view-node class="${tree.Node}" value="${node.id}">
    <ark-tree-view-cell class="${tree.Cell}"><ark-tree-view-node-text class="${tree.NodeText}">${link(node)}</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>`

const branch = (node: Section) => /* html */ `
  <ark-tree-view-node-group class="${tree.NodeGroup}" value="${node.id}">
    <ark-tree-view-node class="${tree.Node}">
      <ark-tree-view-cell class="${tree.Cell}">
        <ark-tree-view-node-expand-trigger class="${tree.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${tree.NodeIndicator}">${chevron}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        <ark-tree-view-node-text class="${tree.NodeText}">${link(node)}</ark-tree-view-node-text>
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${tree.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${tree.IndentGuide}"></ark-tree-view-indent-guide>
      ${(node.children ?? []).map(leaf).join('')}
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toc class="${styles.Root}">
    <ark-toc-content class="${styles.Content}">
      ${sections
        .map(
          (node) =>
            `<section>${heading(node, 'h2')}${(node.children ?? []).map((child) => `<div>${heading(child, 'h3')}</div>`).join('')}</section>`,
        )
        .join('')}
    </ark-toc-content>
    <ark-toc-nav class="${styles.Nav}">
      <ark-toc-title class="${styles.Title}">On this page</ark-toc-title>
      <ark-tree-view class="${tree.Root}">
        <ark-tree-view-tree class="${tree.Tree}">${sections.map(branch).join('')}</ark-tree-view-tree>
      </ark-tree-view>
    </ark-toc-nav>
  </ark-toc>`

  const toc = root.querySelector('ark-toc')!
  const treeView = root.querySelector('ark-tree-view')!
  toc.addEventListener('activechange', (event) => {
    const active = new Set(event.detail.activeIds)
    treeView.expandedValue = sections
      .filter((node) => active.has(node.id) || (node.children ?? []).some((child) => active.has(child.id)))
      .map((node) => node.id)
  })
}
