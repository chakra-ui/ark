import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const splitter = ({ defaultSize }: { defaultSize: number[] }, children: string[]) => /* html */ `
  <ark-splitter class="${styles.Root}" default-size="${defaultSize.join(', ')}">${children.join('')}</ark-splitter>`

interface PanelProps {
  value: string
  minSize: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
}

const panel = ({ value, minSize, maxSize, collapsible, collapsedSize }: PanelProps, children: string[]) => /* html */ `
  <ark-splitter-panel
    class="${styles.Panel}"
    value="${value}"
    ${attr('collapsible', collapsible)}
    ${collapsedSize === undefined ? '' : `collapsed-size="${collapsedSize}"`}
    min-size="${minSize}"
    ${maxSize === undefined ? '' : `max-size="${maxSize}"`}
  >${children.join('')}</ark-splitter-panel>`

const resizeTrigger = ({ value, label = 'Resize' }: { value: string; label?: string }) => /* html */ `
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="${value}" aria-label="${label}">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = splitter({ defaultSize: [15, 20] }, [
    panel({ value: 'a', collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 }, ['A']),
    resizeTrigger({ value: 'a:b' }),
    panel({ value: 'b', minSize: 50 }, ['B']),
  ])
}
