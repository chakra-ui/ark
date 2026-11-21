import { createElement, Check, X, Pencil } from 'lucide'

import '../../src/components/editable/index.js'

import styles from 'styles/editable.module.css'

const icon = (node: typeof Pencil) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const editable = ({ defaultValue }: { defaultValue?: string }, controls: string[] = []) => /* html */ `
  <ark-editable class="${styles.Root}" ${defaultValue !== undefined ? `default-value="${defaultValue}"` : ''}>
    <ark-editable-label class="${styles.Label}">Label</ark-editable-label>
    <ark-editable-area class="${styles.Area}">
      <ark-editable-input><input class="${styles.Input}" /></ark-editable-input>
      <ark-editable-preview class="${styles.Preview}"></ark-editable-preview>
    </ark-editable-area>
    ${controls.length ? /* html */ `<ark-editable-control class="${styles.Control}">${controls.join('')}</ark-editable-control>` : ''}
  </ark-editable>`

const submitTrigger = () =>
  /* html */ `<ark-editable-submit-trigger><button class="${styles.SubmitTrigger}">${icon(Check)}</button></ark-editable-submit-trigger>`

const cancelTrigger = () =>
  /* html */ `<ark-editable-cancel-trigger><button class="${styles.CancelTrigger}">${icon(X)}</button></ark-editable-cancel-trigger>`

const editTrigger = () =>
  /* html */ `<ark-editable-edit-trigger><button class="${styles.EditTrigger}">${icon(Pencil)}</button></ark-editable-edit-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = editable({ defaultValue: 'Click edit to start' }, [submitTrigger(), cancelTrigger(), editTrigger()])
}
