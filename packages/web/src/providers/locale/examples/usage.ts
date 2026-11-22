import { getLocale } from '@ark-ui/web/locale'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<pre></pre>`

  const output = root.querySelector('pre')!
  output.textContent = JSON.stringify(getLocale(output), null, 2)
}
