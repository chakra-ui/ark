import '@ark-ui/web/field'

import styles from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' })
  for (const style of document.head.querySelectorAll('style, link[rel=stylesheet]'))
    shadow.append(style.cloneNode(true))
  const template = document.createElement('template')
  template.innerHTML = /* html */ `
  <ark-field class="${styles.Root}" invalid>
    <ark-field-label><label class="${styles.Label}">Email</label></ark-field-label>
    <ark-field-input><input class="${styles.Input}" placeholder="me@example.com" /></ark-field-input>
    <ark-field-error-text class="${styles.ErrorText}">This is an error text</ark-field-error-text>
  </ark-field>`
  shadow.append(template.content)
  root.replaceChildren(host)
}
