import '../../src/components/tabs/index.js'

import styles from 'styles/tabs.module.css'

interface Pane {
  value: string
  label: string
  content: string
}

const panes: Pane[] = [
  { value: 'account', label: 'Account', content: 'Make changes to your account here.' },
  { value: 'password', label: 'Password', content: 'Change your password here.' },
  { value: 'billing', label: 'Billing', content: 'Manage your billing and payment details.' },
]

const trigger = ({ value, label }: Pane) => /* html */ `
  <ark-tabs-trigger value="${value}">
    <button class="${styles.TriggerIndicator}">${label}</button>
  </ark-tabs-trigger>`

const content = ({ value, content }: Pane) =>
  /* html */ `<ark-tabs-content class="${styles.Content}" value="${value}">${content}</ark-tabs-content>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-tabs class="${styles.Root}" default-value="account" orientation="vertical">
      <ark-tabs-list class="${styles.List}">
        ${panes.map(trigger).join('')}
        <ark-tabs-indicator class="${styles.Indicator}"></ark-tabs-indicator>
      </ark-tabs-list>
      ${panes.map(content).join('')}
    </ark-tabs>`
}
