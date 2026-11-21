import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-splitter class="${styles.Root}" default-size="15, 20">
      <ark-splitter-panel class="${styles.Panel}" value="a" collapsible collapsed-size="5" min-size="10" max-size="20">A</ark-splitter-panel>
      <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="a:b" aria-label="Resize">
        <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
      </ark-splitter-resize-trigger>
      <ark-splitter-panel class="${styles.Panel}" value="b" min-size="50">B</ark-splitter-panel>
    </ark-splitter>`
}
