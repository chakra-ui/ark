import { ChevronRight, createElement, Search } from 'lucide'

import '../../src/components/command/index.js'

import styles from 'styles/command.module.css'

interface Setting {
  value: string
  label: string
  disabled: boolean
  parent?: string
}

const settings: Setting[] = [
  { value: 'theme', label: 'Change theme', disabled: false },
  { value: 'language', label: 'Change language', disabled: false },
  { value: 'sign-out', label: 'Sign out', disabled: false },
  { value: 'light', label: 'Light', disabled: false, parent: 'theme' },
  { value: 'dark', label: 'Dark', disabled: false, parent: 'theme' },
  { value: 'system', label: 'System', disabled: false, parent: 'theme' },
  { value: 'english', label: 'English', disabled: false, parent: 'language' },
  { value: 'french', label: 'French', disabled: false, parent: 'language' },
]

const chevron = () => createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML

const hasChildren = (value: string) => settings.some((item) => item.parent === value)

const item = ({ value, label, parent }: Setting) => /* html */ `
  <ark-command-item class="${styles.Item}" value="${value}" ${parent ? `parent="${parent}"` : ''}>
    <ark-command-item-text class="${styles.ItemText}">${label}</ark-command-item-text>
    <span class="${styles.ItemPath}" hidden></span>
    ${hasChildren(value) ? chevron() : ''}
  </ark-command-item>`

const crumb = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<button type="button" data-page="${value}">${label}</button>`

const pathCrumb = (page: { value: string; label: string }) => /* html */ `<span>${chevron()}${crumb(page)}</span>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <output>Selected: none</output>
  <ark-command class="${styles.Root}">
    <ark-command-label class="${styles.Label}">Settings</ark-command-label>
    <div class="${styles.Breadcrumb}">${crumb({ value: '', label: 'Home' })}</div>
    <ark-command-control class="${styles.Control}">
      ${createElement(Search, { 'aria-hidden': 'true' }).outerHTML}
      <ark-command-input><input class="${styles.Input}" placeholder="Search settings..." aria-label="Search settings" /></ark-command-input>
    </ark-command-control>
    <ark-command-list class="${styles.List}">
      ${settings.map((setting) => item(setting)).join('')}
    </ark-command-list>
    <ark-command-empty class="${styles.Empty}">No results found</ark-command-empty>
  </ark-command>`

  const command = root.querySelector('ark-command')!
  const output = root.querySelector('output')!
  const input = root.querySelector('input')!
  const breadcrumb = root.querySelector<HTMLElement>(`.${styles.Breadcrumb}`)!

  breadcrumb.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest('button')
    if (button) command.setPage(button.dataset.page || null)
  })

  const showPaths = () => {
    for (const setting of settings) {
      const path = root.querySelector<HTMLElement>(`ark-command-item[value="${setting.value}"] .${styles.ItemPath}`)!
      const ancestors = command.getAncestors(setting)
      path.hidden = ancestors.length === 0
      path.textContent = ancestors.map((page) => page.label).join(' › ')
    }
  }

  command.addEventListener('pagechange', () => {
    breadcrumb.innerHTML = [crumb({ value: '', label: 'Home' }), ...command.path.map((page) => pathCrumb(page))].join(
      '',
    )
    input.placeholder = command.page ? 'Search... (Backspace to go back)' : 'Search settings...'
  })

  command.addEventListener('inputvaluechange', showPaths)

  command.addEventListener('itemselect', (event) => {
    output.textContent = `Selected: ${event.detail.itemValue}`
  })
}
