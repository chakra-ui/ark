import { createElement, EllipsisVertical } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

interface Message {
  id: string
  sender: string
  preview: string
}

const messages: Message[] = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
]

const actions = [
  { value: 'reply', label: 'Reply' },
  { value: 'forward', label: 'Forward' },
  { value: 'archive', label: 'Archive' },
]

const message = ({ id, sender, preview }: Message) => /* html */ `
  <div class="${styles.MessageItem}">
    <div class="${styles.MessageContent}">
      <div class="${styles.MessageSender}">${sender}</div>
      <div class="${styles.MessagePreview}">${preview}</div>
    </div>
    <ark-menu-trigger value="${id}">
      <button class="${styles.MessageAction}" aria-label="Actions for ${sender}">${createElement(EllipsisVertical, { 'aria-hidden': 'true' }).outerHTML}</button>
    </ark-menu-trigger>
  </div>`

const item = ({ value, label }: { value: string; label: string }) =>
  /* html */ `<ark-menu-item class="${styles.Item}" value="${value}">${label}</ark-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <output>Action: none</output>
    <ark-menu placement="right-start">
      <div class="${styles.MessageList}">${messages.map(message).join('')}</div>
      <ark-menu-positioner class="${styles.Positioner}">
        <ark-menu-content class="${styles.Content}">
          <ark-menu-list class="${styles.List}">
            ${actions.map(item).join('')}
            <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
            ${item({ value: 'delete', label: 'Delete' })}
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`
  const menuEl = root.querySelector('ark-menu')!
  menuEl.addEventListener('itemselect', (event) => {
    const { value } = event.detail
    root.querySelector('output')!.textContent = `Action: ${value} on message ${menuEl.api?.triggerValue}`
  })
}
