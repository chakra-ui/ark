import '@ark-ui/web/splitter'

import styles from 'styles/splitter.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-splitter class="${styles.Root}" ><ark-splitter-panel class="${styles.Panel}" value="a" >A</ark-splitter-panel>
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="a:b" aria-label="Resize">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger><ark-splitter-panel class="${styles.Panel}" value="b" >B</ark-splitter-panel></ark-splitter>`
}
