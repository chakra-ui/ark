import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const list = (items: string) => `<ark-menu-list class="${styles.List}">${items}</ark-menu-list>`

const item = (value: string, label: string, extra = '') =>
  `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

const submenu = (label: string, items: string, attrs = '', options: { lazy?: boolean } = {}) => `
  <ark-menu ${attrs}>
    <ark-menu-trigger-item class="${styles.TriggerItem}">${label}</ark-menu-trigger-item>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">${options.lazy ? `<template>${list(items)}</template>` : list(items)}</ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-menu unmount-on-exit>
    <ark-menu-context-trigger class="${styles.ContextTrigger}">Right click here</ark-menu-context-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <template>
          ${list(`${item('cut', 'Cut')}${item('copy', 'Copy')}${item('paste', 'Paste')}
          <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
          ${submenu('Share', `${item('email', 'Email')}${item('message', 'Message')}${item('airdrop', 'AirDrop')}`, 'unmount-on-exit', { lazy: true })}`)}
        </template>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`
}
