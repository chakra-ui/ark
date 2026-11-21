import { createElement, X, Info } from 'lucide'

import { createToaster } from '@ark-ui/web/toast'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const onClick = (host: HTMLElement, selector: string, listener: (el: HTMLElement) => void) => {
  for (const el of host.querySelectorAll<HTMLElement>(selector)) el.addEventListener('click', () => listener(el))
}

const store = createToaster({ max: 3, overlap: true, placement: 'bottom-end', gap: 16 })

const messages = [
  'John liked your post',
  'Sarah commented on your photo',
  'New follower: @designpro',
  'Your post was shared 10 times',
  'Meeting reminder in 15 minutes',
]

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  const host = fragment(/* html */ `
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <button type="button" class="${button.Root}" data-one>Add notification</button>
      <button type="button" class="${button.Root}" data-five>Add 5 notifications</button>
    </div>
    <style>${['info', 'success', 'error', 'warning', 'loading']
      .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
      .join('\n')}</style>
    <ark-toaster>
      <template>
        <ark-toast class="${styles.Root}">
          ${createElement(Info, { 'aria-hidden': 'true', class: styles.Indicator }).outerHTML}
          <ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; flex: 1">
            <ark-toast-title class="${styles.Title}"></ark-toast-title>
            <ark-toast-description class="${styles.Description}"></ark-toast-description>
          </ark-toast-content>
          <ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>
        </ark-toast>
      </template>
    </ark-toaster>`)
  onClick(host, '[data-one]', () =>
    store.create({ title: 'New notification', description: 'You have a new message in your inbox.', type: 'info' }),
  )
  onClick(host, '[data-five]', () => {
    for (const msg of messages) store.create({ title: 'Notification', description: msg, type: 'info' })
  })
  root.replaceChildren(connect(host, store))
}
