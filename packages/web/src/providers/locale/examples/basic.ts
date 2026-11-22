import { mount as Usage } from './usage.js'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<div lang="ar-BH"></div>`
  Usage(root.querySelector('div')!)
}
