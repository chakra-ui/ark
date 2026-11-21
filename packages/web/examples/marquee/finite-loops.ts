import '@ark-ui/web/marquee'

import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

const content = () => /* html */ `
      <ark-marquee-content class="${styles.Content}">
        ${items
          .map(
            (item) => /* html */ `
        <ark-marquee-item class="${styles.Item}">
          <span class="${styles.ItemLogo}">${item.logo}</span>
          <span class="${styles.ItemName}">${item.name}</span>
        </ark-marquee-item>`,
          )
          .join('')}
      </ark-marquee-content>`

const marquee = (attrs = '', edges = false) => /* html */ `
  <ark-marquee class="${styles.Root}" ${attrs}>
    ${edges ? `<ark-marquee-edge side="start" class="${styles.Edge}"></ark-marquee-edge>` : ''}
    <ark-marquee-viewport class="${styles.Viewport}">${content()}
    </ark-marquee-viewport>
    ${edges ? `<ark-marquee-edge side="end" class="${styles.Edge}"></ark-marquee-edge>` : ''}
  </ark-marquee>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    ${marquee('loop-count="3"')}
    <div>
      <p>Loop completed: <span data-loops>0</span> times</p>
      <p>Animation completed: <span data-completed>0</span> times</p>
    </div>
  </div>`

  const el = root.querySelector('ark-marquee')!
  const loops = root.querySelector('[data-loops]')!
  const completed = root.querySelector('[data-completed]')!
  el.addEventListener('loopcomplete', () => (loops.textContent = String(Number(loops.textContent) + 1)))
  el.addEventListener('complete', () => (completed.textContent = String(Number(completed.textContent) + 1)))
}
