import type { DrawerElement } from '../../src/components/drawer/index.js'

import '../../src/components/drawer/index.js'

import styles from 'styles/drawer-nested.module.css'

interface Sheet {
  name: string
  title: string
  description: string
  backdrop?: boolean
  body?: string
  next?: { name: string; label: string }
  close: string
}

const sheets: Sheet[] = [
  {
    name: 'account',
    title: 'Account',
    description: 'Nested drawers can be styled to stack, while each drawer remains independently focus managed.',
    backdrop: true,
    next: { name: 'security', label: 'Security settings' },
    close: 'Close',
  },
  {
    name: 'security',
    title: 'Security',
    description: 'Review sign-in activity and update your security preferences.',
    body: /* html */ `
      <ul class="${styles.list}">
        <li>Passkeys enabled</li>
        <li>2FA via authenticator app</li>
        <li>3 signed-in devices</li>
      </ul>`,
    next: { name: 'advanced', label: 'Advanced options' },
    close: 'Close',
  },
  {
    name: 'advanced',
    title: 'Advanced',
    description: 'This drawer is taller to demonstrate variable-height stacking.',
    body: /* html */ `
      <div class="${styles.field}">
        <label class="${styles.label}" for="device-name">Device name</label>
        <input id="device-name" class="${styles.input}" value="Personal laptop" />
      </div>
      <div class="${styles.field}">
        <label class="${styles.label}" for="notes">Notes</label>
        <textarea id="notes" class="${styles.textarea}" rows="3">Rotate recovery codes and revoke older sessions.</textarea>
      </div>`,
    close: 'Done',
  },
]

const backdropOf = (sheet: Sheet) => {
  return sheet.backdrop ? /* html */ `<ark-drawer-backdrop class="${styles.backdrop}"></ark-drawer-backdrop>` : ''
}

const nextOf = (sheet: Sheet) => {
  if (!sheet.next) return ''
  return /* html */ `
    <div class="${styles.actionsLeft}">
      <button class="${styles.ghostButton}" data-open="${sheet.next.name}">${sheet.next.label}</button>
    </div>`
}

const drawerOf = (sheet: Sheet) => /* html */ `
  <ark-drawer data-name="${sheet.name}">
    ${backdropOf(sheet)}
    <ark-drawer-positioner class="${styles.positioner}">
      <ark-drawer-content class="${styles.contentHost}">
        <div class="${styles.popup}">
          <ark-drawer-grabber class="${styles.handle}">
            <ark-drawer-grabber-indicator></ark-drawer-grabber-indicator>
          </ark-drawer-grabber>
          <div class="${styles.content}">
            <ark-drawer-title class="${styles.title}">${sheet.title}</ark-drawer-title>
            <ark-drawer-description class="${styles.description}">${sheet.description}</ark-drawer-description>
            ${sheet.body ?? ''}
            <div class="${styles.actions}">
              ${nextOf(sheet)}
              <ark-drawer-close-trigger><button class="${styles.button}">${sheet.close}</button></ark-drawer-close-trigger>
            </div>
          </div>
        </div>
      </ark-drawer-content>
    </ark-drawer-positioner>
  </ark-drawer>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.main}">
    <button class="${styles.button}" data-open="account">Open drawer stack</button>
    ${sheets.map(drawerOf).join('')}
  </div>`

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-open]')) {
    const drawer = root.querySelector<DrawerElement>(`ark-drawer[data-name="${button.dataset.open}"]`)!
    button.addEventListener('click', () => drawer.api?.setOpen(true))
  }
}
