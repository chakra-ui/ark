import '../../src/components/segment-group/index.js'

import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-segment-group class="${styles.Root}" default-value="React">
    <ark-segment-group-indicator class="${styles.Indicator}"></ark-segment-group-indicator>
    ${frameworks
      .map(
        (framework) => /* html */ `
    <ark-segment-group-item value="${framework}">
      <label class="${styles.Item}">
        <ark-segment-group-item-text class="${styles.ItemText}">${framework}</ark-segment-group-item-text>
        <ark-segment-group-item-control class="${styles.ItemControl}"></ark-segment-group-item-control>
        <ark-segment-group-item-hidden-input></ark-segment-group-item-hidden-input>
      </label>
    </ark-segment-group-item>`,
      )
      .join('')}
  </ark-segment-group>`
}
