import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const arrow = `<ark-menu-arrow class="${styles.Arrow}"><ark-menu-arrow-tip class="${styles.ArrowTip}"></ark-menu-arrow-tip></ark-menu-arrow>`

const list = (items: string) => `<ark-menu-list class="${styles.List}">${items}</ark-menu-list>`

const menuMarkup = (label: string, items: string, attrs = '', options: { arrow?: boolean } = {}) => `
  <ark-menu ${attrs}>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">${options.arrow ? arrow : ''}${list(items)}</ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const item = (value: string, label: string, extra = '') =>
  `<ark-menu-item class="${styles.Item}" value="${value}" ${extra}>${label}</ark-menu-item>`

const submenu = (label: string, items: string, attrs = '', options: { lazy?: boolean } = {}) => `
  <ark-menu ${attrs}>
    <ark-menu-trigger-item class="${styles.TriggerItem}">${label}</ark-menu-trigger-item>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">${options.lazy ? `<template>${list(items)}</template>` : list(items)}</ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const shareItems = `${item('email', 'Email')}${item('message', 'Message')}${submenu('More', `${item('airdrop', 'AirDrop')}${item('nearby', 'Nearby Share')}`)}`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.innerHTML = `<output>Selected: none</output>${menuMarkup(
    'File',
    `${item('new', 'New File')}${item('open', 'Open...')}
     <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
     ${submenu('Share', shareItems)}
     ${submenu('Export', `${item('pdf', 'PDF')}${item('png', 'PNG')}${item('svg', 'SVG')}`)}
     <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
     ${item('print', 'Print...')}`,
  )}`
  host.querySelector('ark-menu')!.addEventListener(
    'itemselect',
    (event) => {
      const { value } = event.detail ?? {}
      if (value) host.querySelector('output')!.textContent = `Selected: ${value}`
    },
    { capture: true },
  )
  root.replaceChildren(host)
}
