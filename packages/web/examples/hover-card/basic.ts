import '@ark-ui/web/hover-card'

import styles from 'styles/hover-card.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-hover-card>
    <p>Liked by <ark-hover-card-trigger><a href="#profile" class="${styles.Trigger}">@sarah_chen</a></ark-hover-card-trigger> and 3 others</p>
    
  <ark-hover-card-positioner class="${styles.Positioner}">
    <ark-hover-card-content class="${styles.Content}">
      <ark-hover-card-arrow class="${styles.Arrow}"><ark-hover-card-arrow-tip class="${styles.ArrowTip}"></ark-hover-card-arrow-tip></ark-hover-card-arrow>
      
      <div class="${styles.Body}">
        <div class="${styles.Header}">
          <img class="${styles.Avatar}" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
          <button type="button" class="${styles.FollowButton}">Follow</button>
        </div>
        <div>
          <p class="${styles.Name}">Sarah Chen</p>
          <p class="${styles.Username}">@sarah_chen</p>
        </div>
        <p class="${styles.Bio}">Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
        <div class="${styles.Stats}">
          <div class="${styles.Stat}">
            <span class="${styles.StatValue}">2,456</span>
            <span class="${styles.StatLabel}">Following</span>
          </div>
          <div class="${styles.Stat}">
            <span class="${styles.StatValue}">14.5K</span>
            <span class="${styles.StatLabel}">Followers</span>
          </div>
        </div>
      </div>
    </ark-hover-card-content>
  </ark-hover-card-positioner>
  </ark-hover-card>`
}
