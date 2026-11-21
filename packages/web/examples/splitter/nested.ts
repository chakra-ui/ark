import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

interface SplitterProps {
  orientation: 'horizontal' | 'vertical'
  className?: string
}

const splitter = ({ orientation, className }: SplitterProps, children: string[]) => /* html */ `
  <ark-splitter ${className ? `class="${className}"` : ''} orientation="${orientation}">${children.join('')}</ark-splitter>`

const panel = ({ value }: { value: string }, children: string[]) => /* html */ `
  <ark-splitter-panel class="${styles.Panel}" value="${value}">${children.join('')}</ark-splitter-panel>`

const resizeTrigger = ({ value, label = 'Resize' }: { value: string; label?: string }) => /* html */ `
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="${value}" aria-label="${label}">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = splitter({ orientation: 'horizontal', className: styles.Root }, [
    panel({ value: 'left' }, ['Left']),
    resizeTrigger({ value: 'left:center' }),
    panel({ value: 'center' }, [
      splitter({ orientation: 'vertical' }, [
        panel({ value: 'top' }, ['Top']),
        resizeTrigger({ value: 'top:bottom' }),
        panel({ value: 'bottom' }, ['Bottom']),
      ]),
    ]),
    resizeTrigger({ value: 'center:right' }),
    panel({ value: 'right' }, ['Right']),
  ])
}
