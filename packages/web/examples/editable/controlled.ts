import { createElement, Pencil } from 'lucide'

import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

interface EditableProps {
  placeholder?: string
  value?: string
}

const editable = ({ placeholder, value }: EditableProps, controls: string[] = []) => /* html */ `
  <ark-editable
    class="${styles.Root}"
    ${placeholder !== undefined ? `placeholder="${placeholder}"` : ''}
    ${value !== undefined ? `value="${value}"` : ''}
  >
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    ${controls.length ? /* html */ `<ark-editable-control class="${styles.Control}">${controls.join('')}</ark-editable-control>` : ''}
  </ark-editable>`

const editTrigger = () =>
  /* html */ `<ark-editable-edit-trigger><button class="${styles.EditTrigger}">${createElement(Pencil, { 'aria-hidden': 'true' }).outerHTML}</button></ark-editable-edit-trigger>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = editable({ placeholder: 'Enter text...', value: 'Hello World' }, [editTrigger()])
  const el = host.querySelector('ark-editable')!
  el.addEventListener('valuechange', (event) => {
    el.setAttribute('value', event.detail.value)
  })
  root.replaceChildren(host)
}
