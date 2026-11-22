import '@ark-ui/web/avatar'

import styles from 'styles/avatar.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-avatar class="${styles.Root}">
    <ark-avatar-fallback class="${styles.Fallback}">PA</ark-avatar-fallback>
    <ark-avatar-image><img class="${styles.Image}" src="https://i.pravatar.cc/300?u=a" alt="avatar" /></ark-avatar-image>
  </ark-avatar>`
}
