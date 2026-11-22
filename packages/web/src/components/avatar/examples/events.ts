import '@ark-ui/web/avatar'

import styles from 'styles/avatar.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="vstack">
    <output>Status: loading...</output>
    <ark-avatar class="${styles.Root}">
      <ark-avatar-fallback class="${styles.Fallback}">PA</ark-avatar-fallback>
      <ark-avatar-image><img class="${styles.Image}" src="https://i.pravatar.cc/3000?u=a" alt="avatar" /></ark-avatar-image>
    </ark-avatar>
  </div>`
  const avatar = root.querySelector('ark-avatar')!
  avatar.addEventListener('statuschange', (event) => {
    root.querySelector('output')!.textContent = `Status: ${event.detail.status}`
  })
}
