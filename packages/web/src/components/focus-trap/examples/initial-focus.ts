import '@ark-ui/web/focus-trap'

import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div>
      <button class="${button.Root}" type="button" data-toggle>Start Trap</button>
      <ark-focus-trap initial-focus="[data-initial-focus]" disabled>
        <div class="stack" style="padding-block: 1rem">
          <input class="${field.Input}" type="text" placeholder="First input" />
          <input class="${field.Input}" type="text" placeholder="Second input (initial focus)" data-initial-focus />
          <textarea class="${field.Textarea}" placeholder="textarea"></textarea>
          <button class="${button.Root}" type="button" data-end>End Trap</button>
        </div>
      </ark-focus-trap>
    </div>`

  const trap = root.querySelector('ark-focus-trap')!
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]')!

  const setTrapped = (trapped: boolean) => {
    trap.disabled = !trapped
    toggle.textContent = trapped ? 'End Trap' : 'Start Trap'
  }

  toggle.addEventListener('click', () => setTrapped(trap.disabled))
  root.querySelector('[data-end]')!.addEventListener('click', () => setTrapped(false))
}
