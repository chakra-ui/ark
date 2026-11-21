import '../../src/components/hover-card/index.js'

import button from 'styles/button.module.css'

import styles from 'styles/hover-card.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div class="stack">
      <button type="button" class="${button.Root}" data-toggle>Toggle</button>
      
  <ark-hover-card open="false">
    <p>Liked by <ark-hover-card-trigger><a href="#profile" class="${styles.Trigger}">@sarah_chen</a></ark-hover-card-trigger> and 3 others</p>
    
  <ark-hover-card-positioner class="${styles.Positioner}">
    <ark-hover-card-content class="${styles.Content}">
      <ark-hover-card-arrow class="${styles.Arrow}"><ark-hover-card-arrow-tip class="${styles.ArrowTip}"></ark-hover-card-arrow-tip></ark-hover-card-arrow>
      
  <div class="${styles.Body}">
    <img class="${styles.Avatar}" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
    <div>
      <p class="${styles.Name}">Sarah Chen</p>
      <p class="${styles.Username}">@sarah_chen</p>
    </div>
    <p class="${styles.Bio}">Design Engineer at Acme Inc.</p>
  </div>
    </ark-hover-card-content>
  </ark-hover-card-positioner>
  </ark-hover-card>
    </div>`
  const hoverCardEl = root.querySelector('ark-hover-card')!
  root.querySelector('[data-toggle]')!.addEventListener('click', () => {
    hoverCardEl.setAttribute('open', String(hoverCardEl.getAttribute('open') !== 'true'))
  })
  hoverCardEl.addEventListener('openchange', (event) => {
    hoverCardEl.setAttribute('open', String(event.detail.open))
  })
}
