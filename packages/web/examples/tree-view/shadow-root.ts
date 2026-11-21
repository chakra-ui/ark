import { createElement, ChevronRight, Check, Minus, Folder, File, ExternalLink } from 'lucide'

import '../../src/components/tree-view/index.js'

import styles from 'styles/tree-view.module.css'

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

const treeView = (attrs: string, tree: string, data = '', label = 'Tree') => /* html */ `
  <ark-tree-view class="${styles.Root}" ${attrs}>
    ${data}
    ${label ? /* html */ `<ark-tree-view-label class="${styles.Label}">${label}</ark-tree-view-label>` : ''}
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

const checkbox = /* html */ `
  <ark-tree-view-node-checkbox class="${styles.NodeCheckbox}">
    <ark-tree-view-node-indicator type="checked" class="${styles.NodeIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
    <ark-tree-view-node-indicator type="indeterminate" class="${styles.NodeIndicator}">${createElement(Minus, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
  </ark-tree-view-node-checkbox>`

const renameInput = /* html */ `<ark-tree-view-node-rename-input><input class="${styles.NodeRenameInput}" /></ark-tree-view-node-rename-input>`

const branch = (
  value: string,
  label: string,
  children: string,
  options: Options = {},
  disabled?: boolean,
) => /* html */ `
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
      ${options.lazy ? /* html */ `<template>${children}</template>` : children}
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>`

const leaf = (value: string, label: string, options: Options = {}, node: Partial<Node> = {}) => {
  const text = (icon: string) =>
    /* html */ `<ark-tree-view-node-text class="${styles.NodeText}">${icon}${label}</ark-tree-view-node-text>`
  const cell = node.href
    ? /* html */ `<ark-tree-view-cell><a class="${styles.Cell}" href="${node.href}">${text(createElement(File, { 'aria-hidden': 'true' }).outerHTML)}${node.href.startsWith('http') ? createElement(ExternalLink, { 'aria-hidden': 'true' }).outerHTML : ''}</a></ark-tree-view-cell>`
    : options.rename
      ? /* html */ `<ark-tree-view-cell class="${styles.Cell}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}${text('')}${renameInput}</ark-tree-view-cell>`
      : /* html */ `<ark-tree-view-cell class="${styles.Cell}">${options.checkbox ? `${checkbox}${text('')}` : text(createElement(File, { 'aria-hidden': 'true' }).outerHTML)}</ark-tree-view-cell>`
  return /* html */ `
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

const Basic = () => treeView(`default-expanded-value="node_modules"`, nodes(files()))

export function mount(container: HTMLElement) {
  container.replaceChildren(inShadowRoot(Basic()))
}
