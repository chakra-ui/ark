import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

const splitter = ({ defaultSize }: { defaultSize: number[] }, children: string[]) => /* html */ `
  <ark-splitter class="${styles.Root}" default-size="${defaultSize.join(', ')}">${children.join('')}</ark-splitter>`

const panel = ({ value, minSize }: { value: string; minSize: number }, children: string[]) => /* html */ `
  <ark-splitter-panel class="${styles.Panel}" value="${value}" min-size="${minSize}">${children.join('')}</ark-splitter-panel>`

const resizeTrigger = ({ value, label = 'Resize' }: { value: string; label?: string }) => /* html */ `
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="${value}" aria-label="${label}">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = splitter({ defaultSize: [20, 60, 20] }, [
    panel({ value: 'a', minSize: 20 }, ['A']),
    resizeTrigger({ value: 'a:b' }),
    panel({ value: 'b', minSize: 40 }, ['B']),
    resizeTrigger({ value: 'b:c' }),
    panel({ value: 'c', minSize: 20 }, ['C']),
  ])
}
