import { createHotkeys } from '@ark-ui/web/hotkeys'

import styles from 'styles/hotkeys.module.css'

const routes = [
  { id: 'home', hotkey: 'G > H', keys: ['G', 'H'], label: 'Home' },
  { id: 'settings', hotkey: 'G > S', keys: ['G', 'S'], label: 'Settings' },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Panel}">
    <p class="${styles.Hint}">Press the keys in order, one after the other</p>
    <ul class="${styles.List}">
      ${routes
        .map(
          (route) => /* html */ `
          <li class="${styles.Row}" data-id="${route.id}">
            <span>${route.label}</span>
            <span class="${styles.KeyStrip}">
              ${route.keys.map((key, index) => /* html */ `<kbd class="${styles.Kbd}">${index > 0 ? `then ${key}` : key}</kbd>`).join('')}
            </span>
          </li>`,
        )
        .join('')}
    </ul>
    <div class="${styles.Metric}">
      <span class="${styles.MetricLabel}">Current page</span>
      <span class="${styles.Badge}" data-state="active"></span>
    </div>
  </div>`

  const rows = root.querySelectorAll<HTMLElement>(`.${styles.Row}`)
  const badge = root.querySelector(`.${styles.Badge}`)!

  const setPage = (page: string) => {
    badge.textContent = page

    for (const row of rows) {
      const active = row.dataset.id === page
      row.toggleAttribute('data-fired', active)
      for (const kbd of row.querySelectorAll('kbd')) kbd.toggleAttribute('data-active', active)
    }
  }

  setPage('home')

  createHotkeys(routes.map((route) => ({ id: route.id, hotkey: route.hotkey, action: () => setPage(route.id) })))
}
