import '../../src/components/hover-card/index.js'

import styles from 'styles/hover-card.module.css'

const trigger = ({ text, value }: { text: string; value?: string }) =>
  /* html */ `<ark-hover-card-trigger${value ? ` value="${value}"` : ''}><a href="#${value ? '' : 'profile'}" class="${styles.Trigger}">${text}</a></ark-hover-card-trigger>`

const card = (children: string[]) => /* html */ `
  <ark-hover-card-positioner class="${styles.Positioner}">
    <ark-hover-card-content class="${styles.Content}">
      <ark-hover-card-arrow class="${styles.Arrow}"><ark-hover-card-arrow-tip class="${styles.ArrowTip}"></ark-hover-card-arrow-tip></ark-hover-card-arrow>
      ${children.join('')}
    </ark-hover-card-content>
  </ark-hover-card-positioner>`

const profile = /* html */ `
  <div class="${styles.Body}">
    <img class="${styles.Avatar}" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
    <div>
      <p class="${styles.Name}">Sarah Chen</p>
      <p class="${styles.Username}">@sarah_chen</p>
    </div>
    <p class="${styles.Bio}">Design Engineer at Acme Inc.</p>
  </div>`

const likedBy = ({ openDelay, closeDelay }: { openDelay: number; closeDelay: number }) => /* html */ `
  <ark-hover-card open-delay="${openDelay}" close-delay="${closeDelay}">
    <p>Liked by ${trigger({ text: '@sarah_chen' })} and 3 others</p>
    ${card([profile])}
  </ark-hover-card>`

export function mount(root: HTMLElement) {
  root.innerHTML = likedBy({ openDelay: 200, closeDelay: 500 })
}
