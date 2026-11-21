import '../../src/components/splitter/index.js'

import styles from 'styles/splitter.module.css'

const splitterMarkup = (attrs: string, children: string, className = styles.Root) =>
  /* html */ `<ark-splitter${className ? ` class="${className}"` : ''} ${attrs}>${children}</ark-splitter>`

const panel = (value: string, content: string, attrs = '') =>
  /* html */ `<ark-splitter-panel class="${styles.Panel}" value="${value}" ${attrs}>${content}</ark-splitter-panel>`

const trigger = (value: string, label = 'Resize') => /* html */ `
  <ark-splitter-resize-trigger class="${styles.ResizeTrigger}" value="${value}" aria-label="${label}">
    <ark-splitter-resize-trigger-indicator class="${styles.ResizeTriggerIndicator}"></ark-splitter-resize-trigger-indicator>
  </ark-splitter-resize-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = splitterMarkup('orientation="vertical"', `${panel('a', 'A')}${trigger('a:b')}${panel('b', 'B')}`)
}
