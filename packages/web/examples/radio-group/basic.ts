import '../../src/components/radio-group/index.js'

import styles from 'styles/radio-group.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-radio-group class="${styles.Root}" default-value="React">
    <ark-radio-group-label class="${styles.Label}">Framework</ark-radio-group-label>
    
    
    
      <ark-radio-group-item value="React" >
        <label class="${styles.Item}">
          <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
          <ark-radio-group-item-text class="${styles.ItemText}">React</ark-radio-group-item-text>
          <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
        </label>
      </ark-radio-group-item>
      <ark-radio-group-item value="Solid" >
        <label class="${styles.Item}">
          <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
          <ark-radio-group-item-text class="${styles.ItemText}">Solid</ark-radio-group-item-text>
          <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
        </label>
      </ark-radio-group-item>
      <ark-radio-group-item value="Vue" >
        <label class="${styles.Item}">
          <ark-radio-group-item-control class="${styles.ItemControl}"></ark-radio-group-item-control>
          <ark-radio-group-item-text class="${styles.ItemText}">Vue</ark-radio-group-item-text>
          <ark-radio-group-item-hidden-input></ark-radio-group-item-hidden-input>
        </label>
      </ark-radio-group-item>
    
  </ark-radio-group>`
}
