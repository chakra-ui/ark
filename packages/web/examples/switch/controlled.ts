import '../../src/components/switch/index.js'

import styles from 'styles/switch.module.css'

const switchMarkup = (attrs: string) => `
  <ark-switch ${attrs}>
    <label class="${styles.Root}">
      <ark-switch-control class="${styles.Control}"><ark-switch-thumb class="${styles.Thumb}"></ark-switch-thumb></ark-switch-control>
      <ark-switch-label class="${styles.Label}">Label</ark-switch-label>
      <ark-switch-hidden-input></ark-switch-hidden-input>
    </label>
  </ark-switch>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = `<output>checked: false</output>${switchMarkup('checked="false"')}`
  const el = host.querySelector('ark-switch')!
  el.addEventListener('checkedchange', (event) => {
    const { checked } = event.detail
    el.setAttribute('checked', String(checked))
    host.querySelector('output')!.textContent = `checked: ${checked}`
  })
  root.replaceChildren(host)
}
