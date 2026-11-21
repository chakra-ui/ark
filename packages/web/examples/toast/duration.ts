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

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '∞', value: Infinity },
]

const typeStyle = /* html */ `<style>${['info', 'success', 'error', 'warning', 'loading']
  .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
  .join('\n')}</style>`

const toaster = (children: string[]) => /* html */ `
  ${typeStyle}
  <ark-toaster>
    <template>
      <ark-toast class="${styles.Root}">${children.join('')}</ark-toast>
    </template>
  </ark-toaster>`

const title = (children: string[] = []) =>
  /* html */ `<ark-toast-title class="${styles.Title}">${children.join('')}</ark-toast-title>`

const description = /* html */ `<ark-toast-description class="${styles.Description}"></ark-toast-description>`

const content = ({ style = '' }: { style?: string } = {}, children = [title(), description]) =>
  /* html */ `<ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ${style}">${children.join('')}</ark-toast-content>`

const closeTrigger = /* html */ `<ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>`

const onClick = (host: HTMLElement, selector: string, listener: (el: HTMLElement) => void) => {
  for (const el of host.querySelectorAll<HTMLElement>(selector)) el.addEventListener('click', () => listener(el))
}

const store = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  const host = fragment(/* html */ `
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      ${durations.map((duration, index) => /* html */ `<button type="button" class="${button.Root}" data-index="${index}">${duration.label}</button>`).join('')}
    </div>
    ${toaster([content({}, [title([indicator({ name: 'clock' })]), description]), closeTrigger])}`)
  onClick(host, '[data-index]', (el) => {
    const duration = durations[Number(el.dataset.index)]
    store.create({
      title: 'Reminder set',
      description: `This notification will ${
        duration.value === Infinity ? 'stay until dismissed' : `disappear in ${duration.label}`
      }.`,
      type: 'info',
      duration: duration.value,
    })
  })
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

interface IndicatorProps {
  name: keyof typeof indicatorIcons
  attrs?: Record<string, string>
}

const indicator = ({ name, attrs = {} }: IndicatorProps) =>
  createElement(indicatorIcons[name], { 'aria-hidden': 'true', class: styles.Indicator, ...attrs }).outerHTML
