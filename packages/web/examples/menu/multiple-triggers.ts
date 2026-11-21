import { createElement, EllipsisVertical } from 'lucide'

import '../../src/components/menu/index.js'

import styles from 'styles/menu.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <output>Action: none</output>
    <ark-menu placement="right-start">
      <div class="${styles.MessageList}">
        
          <div class="${styles.MessageItem}">
            <div class="${styles.MessageContent}">
              <div class="${styles.MessageSender}">Alice Johnson</div>
              <div class="${styles.MessagePreview}">Hey, can you review the latest PR?</div>
            </div>
            <ark-menu-trigger value="1">
              <button class="${styles.MessageAction}" aria-label="Actions for Alice Johnson">${createElement(EllipsisVertical, { 'aria-hidden': 'true' }).outerHTML}</button>
            </ark-menu-trigger>
          </div>
          <div class="${styles.MessageItem}">
            <div class="${styles.MessageContent}">
              <div class="${styles.MessageSender}">Bob Smith</div>
              <div class="${styles.MessagePreview}">Meeting notes from today are attached.</div>
            </div>
            <ark-menu-trigger value="2">
              <button class="${styles.MessageAction}" aria-label="Actions for Bob Smith">${createElement(EllipsisVertical, { 'aria-hidden': 'true' }).outerHTML}</button>
            </ark-menu-trigger>
          </div>
          <div class="${styles.MessageItem}">
            <div class="${styles.MessageContent}">
              <div class="${styles.MessageSender}">Carol Davis</div>
              <div class="${styles.MessagePreview}">The deploy finished successfully!</div>
            </div>
            <ark-menu-trigger value="3">
              <button class="${styles.MessageAction}" aria-label="Actions for Carol Davis">${createElement(EllipsisVertical, { 'aria-hidden': 'true' }).outerHTML}</button>
            </ark-menu-trigger>
          </div>
      </div>
      <ark-menu-positioner class="${styles.Positioner}">
        <ark-menu-content class="${styles.Content}">
          <ark-menu-list class="${styles.List}">
            <ark-menu-item class="${styles.Item}" value="reply" >Reply</ark-menu-item><ark-menu-item class="${styles.Item}" value="forward" >Forward</ark-menu-item><ark-menu-item class="${styles.Item}" value="archive" >Archive</ark-menu-item>
            <ark-menu-separator class="${styles.Separator}"></ark-menu-separator>
            <ark-menu-item class="${styles.Item}" value="delete" >Delete</ark-menu-item>
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
