import { ArrowDownLeft, createElement, GripVertical, Maximize2, Minus, X } from 'lucide'

import '@ark-ui/web/floating-panel'

import styles from 'styles/floating-panel.module.css'

const icon = (node: typeof X) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const placements = ['n', 'e', 'w', 's', 'ne', 'se', 'sw', 'nw']

const panel = (attrs = '', body = '<p>Some content</p>', lazy = false) => /* html */ `
  <ark-floating-panel ${attrs}>
    <ark-floating-panel-trigger><button class="${styles.Trigger}">Toggle Panel</button></ark-floating-panel-trigger>
    <ark-floating-panel-positioner class="${styles.Positioner}">
      <ark-floating-panel-content class="${styles.Content}">${lazy ? '<template>' : ''}
        <ark-floating-panel-drag-trigger>
          <ark-floating-panel-header class="${styles.Header}">
            <ark-floating-panel-title class="${styles.Title}">${icon(GripVertical)} Floating Panel</ark-floating-panel-title>
            <ark-floating-panel-control class="${styles.Control}">
              <ark-floating-panel-stage-trigger stage="minimized"><button class="${styles.ControlButton}">${icon(Minus)}</button></ark-floating-panel-stage-trigger>
              <ark-floating-panel-stage-trigger stage="maximized"><button class="${styles.ControlButton}">${icon(Maximize2)}</button></ark-floating-panel-stage-trigger>
              <ark-floating-panel-stage-trigger stage="default"><button class="${styles.ControlButton}">${icon(ArrowDownLeft)}</button></ark-floating-panel-stage-trigger>
              <ark-floating-panel-close-trigger><button class="${styles.ControlButton}">${icon(X)}</button></ark-floating-panel-close-trigger>
            </ark-floating-panel-control>
          </ark-floating-panel-header>
        </ark-floating-panel-drag-trigger>
        <ark-floating-panel-body class="${styles.Body}">${body}</ark-floating-panel-body>
        ${placements
          .map(
            (placement) =>
              `<ark-floating-panel-resize-trigger placement="${placement}" class="${styles.ResizeTrigger}"></ark-floating-panel-resize-trigger>`,
          )
          .join('')}${lazy ? '</template>' : ''}
      </ark-floating-panel-content>
    </ark-floating-panel-positioner>
  </ark-floating-panel>`

export function mount(root: HTMLElement) {
  root.innerHTML = panel('open="false"')
  const el = root.querySelector('ark-floating-panel')!
  el.addEventListener('openchange', (event) => el.setAttribute('open', String(event.detail.open)))
}
