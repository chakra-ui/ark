import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

const panel = ({ value }: { value: string }, children: string[]) => /* html */ `
  <ark-splitter-panel class="${styles.Panel}" value="${value}">${children.join('')}</ark-splitter-panel>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-splitter class="${styles.Root}" orientation="vertical">
      ${panel({ value: 'a' }, ['A'])}
      <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="a:b" aria-label="Resize">
        <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
      </ark-splitter-resize-trigger>
      ${panel({ value: 'b' }, ['B'])}
    </ark-splitter>`
}
