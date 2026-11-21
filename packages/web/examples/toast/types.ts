import { createElement, X, CircleCheck, CircleAlert, TriangleAlert, Info } from 'lucide'

import { createToaster } from '../../src/components/toast/index.js'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const indicatorIcons = {
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
}

const indicator = (type: keyof typeof indicatorIcons) =>
  createElement(indicatorIcons[type], {
    'aria-hidden': 'true',
    class: styles.Indicator,
    'data-icon': type,
  }).outerHTML

const onClick = (host: HTMLElement, selector: string, listener: (el: HTMLElement) => void) => {
  for (const el of host.querySelectorAll<HTMLElement>(selector)) el.addEventListener('click', () => listener(el))
}

const store = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })

const actions = {
  success: () => store.success({ title: 'Changes saved', description: 'Your profile has been updated successfully.' }),
  error: () => store.error({ title: 'Upload failed', description: 'There was an error uploading your file.' }),
  warning: () => store.warning({ title: 'Low storage', description: 'You have less than 10% storage remaining.' }),
  info: () => store.info({ title: 'Update available', description: 'A new version of the app is ready to install.' }),
}

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

const typeButtons = [
  { type: 'success', label: 'Success' },
  { type: 'error', label: 'Error' },
  { type: 'warning', label: 'Warning' },
  { type: 'info', label: 'Info' },
]

const typeButton = ({ type, label }: { type: string; label: string }) =>
  /* html */ `<button type="button" class="${button.Root}" data-type="${type}">${label}</button>`

export function mount(root: HTMLElement) {
  const host = fragment(/* html */ `
    <div style="display: flex; gap: 12px; flex-wrap: wrap">
      ${typeButtons.map(typeButton).join('')}
    </div>
    <style>${['info', 'success', 'error', 'warning', 'loading']
      .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
      .join('\n')}</style>
    <ark-toaster>
      <template>
        <ark-toast class="${styles.Root}">
          <ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ">
            <ark-toast-title class="${styles.Title}">${(['success', 'error', 'warning', 'info'] as const).map(indicator).join('')}</ark-toast-title>
            <ark-toast-description class="${styles.Description}"></ark-toast-description>
          </ark-toast-content>
          <ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>
        </ark-toast>
      </template>
    </ark-toaster>`)
  onClick(host, 'button[data-type]', (el) => actions[el.dataset.type as keyof typeof actions]())
  root.replaceChildren(connect(host, store))
}
