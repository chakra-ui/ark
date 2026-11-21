import '@ark-ui/web/scroll-area'

import styles from 'styles/scroll-area.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-scroll-area class="${styles.Root}" style="height: auto">
  <ark-scroll-area-viewport class="${styles.Viewport}">
    <ark-scroll-area-content class="${styles.Content}">
      <p class="${styles.Paragraph}" style="width: 50vw">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </ark-scroll-area-content>
  </ark-scroll-area-viewport>
  <ark-scroll-area-scrollbar class="${styles.Scrollbar}" orientation="horizontal">
    <ark-scroll-area-thumb class="${styles.Thumb}"></ark-scroll-area-thumb>
  </ark-scroll-area-scrollbar>
  <ark-scroll-area-corner class="${styles.Corner}"></ark-scroll-area-corner>
</ark-scroll-area>`
}
