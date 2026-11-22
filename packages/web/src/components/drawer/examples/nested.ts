import type { DrawerElement } from '@ark-ui/web/drawer'

import '@ark-ui/web/drawer'

import styles from 'styles/drawer-nested.module.css'

interface Field {
  id: string
  label: string
  value: string
  rows?: number
}

interface Sheet {
  name: string
  title: string
  description: string
  backdrop?: boolean
  list?: string[]
  fields?: Field[]
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
    list: ['Passkeys enabled', '2FA via authenticator app', '3 signed-in devices'],
    next: { name: 'advanced', label: 'Advanced options' },
    close: 'Close',
  },
  {
    name: 'advanced',
    title: 'Advanced',
    description: 'This drawer is taller to demonstrate variable-height stacking.',
    fields: [
      { id: 'device-name', label: 'Device name', value: 'Personal laptop' },
      { id: 'notes', label: 'Notes', value: 'Rotate recovery codes and revoke older sessions.', rows: 3 },
    ],
    close: 'Done',
  },
]

const field = ({ id, label, value, rows }: Field) => /* html */ `
  <div class="${styles.field}">
    <label class="${styles.label}" for="${id}">${label}</label>
    ${
      rows
        ? /* html */ `<textarea id="${id}" class="${styles.textarea}" rows="${rows}">${value}</textarea>`
        : /* html */ `<input id="${id}" class="${styles.input}" value="${value}" />`
    }
  </div>`

const drawer = (sheet: Sheet) => /* html */ `
  <ark-drawer data-name="${sheet.name}">
    ${sheet.backdrop ? /* html */ `<ark-drawer-backdrop class="${styles.backdrop}"></ark-drawer-backdrop>` : ''}
    <ark-drawer-positioner class="${styles.positioner}">
      <ark-drawer-content class="${styles.contentHost}">
        <div class="${styles.popup}">
          <ark-drawer-grabber class="${styles.handle}">
            <ark-drawer-grabber-indicator></ark-drawer-grabber-indicator>
          </ark-drawer-grabber>
          <div class="${styles.content}">
            <ark-drawer-title class="${styles.title}">${sheet.title}</ark-drawer-title>
            <ark-drawer-description class="${styles.description}">${sheet.description}</ark-drawer-description>
            ${
              sheet.list
                ? /* html */ `<ul class="${styles.list}">${sheet.list.map((item) => /* html */ `<li>${item}</li>`).join('')}</ul>`
                : ''
            }
            ${sheet.fields ? sheet.fields.map(field).join('') : ''}
            <div class="${styles.actions}">
              ${
                sheet.next
                  ? /* html */ `<div class="${styles.actionsLeft}"><button class="${styles.ghostButton}" data-open="${sheet.next.name}">${sheet.next.label}</button></div>`
                  : ''
              }
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
    ${sheets.map(drawer).join('')}
  </div>`

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-open]')) {
    const drawer = root.querySelector<DrawerElement>(`ark-drawer[data-name="${button.dataset.open}"]`)!
    button.addEventListener('click', () => drawer.api?.setOpen(true))
  }
}
