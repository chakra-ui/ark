import { createElement, ChevronDown } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

const menu = ({ label }: { label: string }, items: string[]) => /* html */ `
  <ark-menu>
    <ark-menu-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-menu-indicator class="${styles.Indicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-menu-indicator>
      </button>
    </ark-menu-trigger>
    <ark-menu-positioner class="${styles.Positioner}">
      <ark-menu-content class="${styles.Content}">
        <ark-menu-list class="${styles.List}">${items.join('')}</ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const link = ({ value, href, label }: { value: string; href: string; label: string }) => /* html */ `
  <ark-menu-item value="${value}">
    <a class="${styles.Item}" href="${href}">${label}</a>
  </ark-menu-item>`

const separator = () => /* html */ `<ark-menu-separator class="${styles.Separator}"></ark-menu-separator>`

export function mount(root: HTMLElement) {
  root.innerHTML = menu({ label: 'Help' }, [
    link({ value: 'docs', href: 'https://ark-ui.com', label: 'Documentation' }),
    link({ value: 'github', href: 'https://github.com/chakra-ui/ark', label: 'GitHub' }),
    separator(),
    link({ value: 'changelog', href: 'https://github.com/chakra-ui/ark/releases', label: 'Changelog' }),
  ])
}
