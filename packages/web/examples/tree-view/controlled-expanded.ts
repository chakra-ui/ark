import { createElement, ChevronRight, Check, Minus, Folder, File, ExternalLink } from 'lucide'

import '../../src/components/tree-view/index.js'

import styles from 'styles/tree-view.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<output>expanded: node_modules</output>
  <ark-tree-view class="${styles.Root}" expanded-value="node_modules">
    
    <ark-tree-view-label class="${styles.Label}">Tree</ark-tree-view-label>
    <ark-tree-view-tree class="${styles.Tree}">
  <ark-tree-view-node-group class="${styles.NodeGroup}" value="node_modules" >
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        
        <ark-tree-view-node-text class="${styles.NodeText}">${createElement(Folder, { 'aria-hidden': 'true' }).outerHTML}node_modules</ark-tree-view-node-text>
        
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      
  <ark-tree-view-node class="${styles.Node}" value="node_modules/zag-js" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}zag-js</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="node_modules/pandacss" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}panda</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node-group class="${styles.NodeGroup}" value="node_modules/@types" >
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        
        <ark-tree-view-node-text class="${styles.NodeText}">${createElement(Folder, { 'aria-hidden': 'true' }).outerHTML}@types</ark-tree-view-node-text>
        
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      
  <ark-tree-view-node class="${styles.Node}" value="node_modules/@types/react" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}react</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="node_modules/@types/react-dom" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}react-dom</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>
  <ark-tree-view-node-group class="${styles.NodeGroup}" value="src" >
    <ark-tree-view-node class="${styles.Node}">
      <ark-tree-view-cell class="${styles.Cell}">
        <ark-tree-view-node-expand-trigger class="${styles.NodeExpandTrigger}">
          <ark-tree-view-node-indicator class="${styles.NodeIndicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-tree-view-node-indicator>
        </ark-tree-view-node-expand-trigger>
        
        <ark-tree-view-node-text class="${styles.NodeText}">${createElement(Folder, { 'aria-hidden': 'true' }).outerHTML}src</ark-tree-view-node-text>
        
      </ark-tree-view-cell>
    </ark-tree-view-node>
    <ark-tree-view-node-group-content class="${styles.NodeGroupContent}">
      <ark-tree-view-indent-guide class="${styles.IndentGuide}"></ark-tree-view-indent-guide>
      
  <ark-tree-view-node class="${styles.Node}" value="src/app.tsx" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}app.tsx</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="src/index.ts" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}index.ts</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
    </ark-tree-view-node-group-content>
  </ark-tree-view-node-group>
  <ark-tree-view-node class="${styles.Node}" value="panda.config" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}panda.config.ts</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="package.json" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}package.json</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="renovate.json" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}renovate.json</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node>
  <ark-tree-view-node class="${styles.Node}" value="readme.md" >
    <ark-tree-view-cell class="${styles.Cell}"><ark-tree-view-node-text class="${styles.NodeText}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}README.md</ark-tree-view-node-text></ark-tree-view-cell>
  </ark-tree-view-node></ark-tree-view-tree>
  </ark-tree-view>`
  const tree = root.querySelector('ark-tree-view')!
  tree.addEventListener('expandedchange', (event) => {
    const { expandedValue } = event.detail
    tree.setAttribute('expanded-value', expandedValue.join(','))
    root.querySelector('output')!.textContent = `expanded: ${expandedValue.join(', ')}`
  })
}
