import { createElement, ChevronRight, Check, Minus, Folder, File, ExternalLink } from 'lucide'

import '../../src/components/tree-view/index.js'

import styles from 'styles/tree-view.module.css'

const treeView = (attrs: string, tree: string, data = '', label = 'Tree') => `
  <ark-tree-view class="${styles.Root}" ${attrs}>
    ${data}
    ${label ? `<ark-tree-view-label class="${styles.Label}">${label}</ark-tree-view-label>` : ''}
    <ark-tree-view-tree class="${styles.Tree}">${tree}</ark-tree-view-tree>
  </ark-tree-view>`

interface Node {
  value: string
  label: string
  disabled?: boolean
  href?: string
  children?: Node[]
}

interface Options {
  checkbox?: boolean
  rename?: boolean
  lazy?: boolean
  plain?: boolean
}

const attrs = (value: string, disabled?: boolean) => `${value ? `value="${value}"` : ''} ${disabled ? 'disabled' : ''}`

const checkbox = `
  <ark-tree-view-node-checkbox class="${styles.NodeCheckbox}">
    <ark-tree-view-node-indicator type="checked" class="${styles.NodeIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
    <ark-tree-view-node-indicator type="indeterminate" class="${styles.NodeIndicator}">${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
  </ark-tree-view-node-checkbox>`

const renameInput = `<ark-tree-view-node-rename-input><input class="${styles.NodeRenameInput}" /></ark-tree-view-node-rename-input>`

const branch = (value: string, label: string, children: string, options: Options = {}, disabled?: boolean) => `
  <ark-tree-view-node-group class="${styles.NodeGroup}" ${attrs(value, disabled)}>
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        ${options.checkbox ? checkbox : ''}
        <ark-tree-view-node-text class="${styles.NodeText}">${options.checkbox || options.plain ? '' : createElement(Folder, { 'aria-hidden': 'true' }).outerHTML}${label}</ark-tree-view-node-text>
        ${options.rename ? renameInput : ''}
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      ${options.lazy ? `<template>${children}</template>` : children}
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>`

const leaf = (value: string, label: string, options: Options = {}, node: Partial<Node> = {}) => {
  const text = (icon: string) =>
    `<ark-tree-view-node-text class="${styles.NodeText}">${icon}${label}</ark-tree-view-node-text>`
  const cell = node.href
    ? `<ark-tree-view-cell><a class="${styles.Cell}" href="${node.href}">${text(createElement(File, { 'aria-hidden': 'true' }).outerHTML)}${node.href.startsWith('http') ? createElement(ExternalLink, { 'aria-hidden': 'true' }).outerHTML : ''}</a></ark-tree-view-cell>`
    : options.rename
      ? `<ark-tree-view-cell class="${styles.Cell}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}${text('')}${renameInput}</ark-tree-view-cell>`
      : `<ark-tree-view-cell class="${styles.Cell}">${options.checkbox ? `${checkbox}${text('')}` : text(createElement(File, { 'aria-hidden': 'true' }).outerHTML)}</ark-tree-view-cell>`
  return `
  <ark-tree-view-node class="${styles.Node}" ${attrs(value, node.disabled)}>
    ${cell}
  </ark-tree-view-node>`
}

const nodes = (items: Node[], options: Options = {}): string =>
  items
    .map((node) =>
      node.children
        ? branch(node.value, node.label, nodes(node.children, options), options, node.disabled)
        : leaf(node.value, node.label, options, node),
    )
    .join('')

export function mount(root: HTMLElement) {
  root.innerHTML = treeView(
    '',
    nodes(
      [
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
      ],
      { plain: true },
    ),
    '',
    'Docs',
  )
}
