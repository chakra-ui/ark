import { createElement, X, Clock, Info, CircleCheck, CircleAlert, TriangleAlert, LoaderCircle } from 'lucide'

import { createToaster } from '../../src/components/toast/index.js'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const typeStyle = `<style>${['info', 'success', 'error', 'warning', 'loading']
  .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
  .join('\n')}</style>`

const toaster = (body: string) => `
  ${typeStyle}
  <ark-toaster>
    <template>
      <ark-toast class="${styles.Root}">${body}</ark-toast>
    </template>
  </ark-toaster>`

const title = (prefix = '') => `<ark-toast-title class="${styles.Title}">${prefix}</ark-toast-title>`

const description = `<ark-toast-description class="${styles.Description}"></ark-toast-description>`

const content = (body = `${title()}${description}`, style = '') =>
  `<ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ${style}">${body}</ark-toast-content>`

const closeTrigger = `<ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>`

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

export function mount(root: HTMLElement) {
  const host = fragment(`
    <div style="display: flex; gap: 12px; flex-wrap: wrap">
      <button type="button" class="${button.Root}" data-type="success">Success</button>
      <button type="button" class="${button.Root}" data-type="error">Error</button>
      <button type="button" class="${button.Root}" data-type="warning">Warning</button>
      <button type="button" class="${button.Root}" data-type="info">Info</button>
    </div>
    ${toaster(`${content(`${title(typeIndicators(['success', 'error', 'warning', 'info']))}${description}`)}${closeTrigger}`)}`)
  onClick(host, 'button[data-type]', (el) => actions[el.dataset.type as keyof typeof actions]())
  root.replaceChildren(connect(host, store))
}

const indicatorIcons = {
  clock: Clock,
  info: Info,
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  loading: LoaderCircle,
}

const indicator = (name: keyof typeof indicatorIcons, attrs: Record<string, string> = {}) =>
  createElement(indicatorIcons[name], { 'aria-hidden': 'true', class: styles.Indicator, ...attrs }).outerHTML

const typeIndicators = (types: (keyof typeof indicatorIcons)[]) =>
  types
    .map((type) => indicator(type, { 'data-icon': type, ...(type === 'loading' ? { 'data-type': 'loading' } : {}) }))
    .join('')
