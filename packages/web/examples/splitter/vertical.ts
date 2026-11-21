import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

const splitter = ({ orientation }: { orientation: 'horizontal' | 'vertical' }, children: string[]) => /* html */ `
  <ark-splitter class="${styles.Root}" orientation="${orientation}">${children.join('')}</ark-splitter>`

const panel = ({ value }: { value: string }, children: string[]) => /* html */ `
  <ark-splitter-panel class="${styles.Panel}" value="${value}">${children.join('')}</ark-splitter-panel>`

const resizeTrigger = ({ value, label = 'Resize' }: { value: string; label?: string }) => /* html */ `
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="${value}" aria-label="${label}">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = splitter({ orientation: 'vertical' }, [
    panel({ value: 'a' }, ['A']),
    resizeTrigger({ value: 'a:b' }),
    panel({ value: 'b' }, ['B']),
  ])
}
