import { createElement, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide'

import '../../src/components/toggle-group/index.js'

import styles from 'styles/toggle-group.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-toggle-group class="${styles.Root}" default-value="left">
    <ark-toggle-group-item value="left"><button class="${styles.Item}" >${createElement(AlignLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toggle-group-item><ark-toggle-group-item value="center"><button class="${styles.Item}" >${createElement(AlignCenter, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toggle-group-item><ark-toggle-group-item value="right"><button class="${styles.Item}" >${createElement(AlignRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toggle-group-item><ark-toggle-group-item value="justify"><button class="${styles.Item}" >${createElement(AlignJustify, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toggle-group-item>
  </ark-toggle-group>`
}
