import '../../src/components/tabs/index.js'

import styles from 'styles/tabs.module.css'

const panes = [
  { value: 'account', label: 'Account', content: 'Make changes to your account here.' },
  { value: 'password', label: 'Password', content: 'Change your password here.' },
  { value: 'billing', label: 'Billing', content: 'Manage your billing and payment details.' },
]

const tabsMarkup = (
  attrs: string,
  { indicator = false, disabled = '', links = false, lazy = false } = {},
) => /* html */ `
  <ark-tabs class="${styles.Root}" ${attrs.includes('value=') ? '' : 'default-value="account"'} ${attrs}>
    <ark-tabs-list class="${styles.List}">
      ${panes
        .map(
          (pane) => /* html */ `
        <ark-tabs-trigger value="${pane.value}" ${disabled === pane.value ? 'disabled' : ''}>
          ${
            links
              ? /* html */ `<a class="${styles.Trigger}" href="#${pane.value}">${pane.label}</a>`
              : /* html */ `<button class="${indicator ? styles.TriggerIndicator : styles.Trigger}">${pane.label}</button>`
          }
        </ark-tabs-trigger>`,
        )
        .join('')}
      ${indicator ? /* html */ `<ark-tabs-indicator class="${styles.Indicator}"></ark-tabs-indicator>` : ''}
    </ark-tabs-list>
    ${panes
      .map(
        (pane) =>
          /* html */ `<ark-tabs-content class="${styles.Content}" value="${pane.value}">${lazy ? /* html */ `<template>${pane.content}</template>` : pane.content}</ark-tabs-content>`,
      )
      .join('')}
  </ark-tabs>`

export function mount(root: HTMLElement) {
  root.innerHTML = tabsMarkup('', { links: true })
}
