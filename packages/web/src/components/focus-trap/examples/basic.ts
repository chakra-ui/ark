import '@ark-ui/web/focus-trap'

import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <button class="${button.Root}" type="button" data-start>Start Trap</button>
    <ark-focus-trap return-focus-on-deactivate="false" disabled>
      <div class="stack" style="padding-block: 1rem">
        <input class="${field.Input}" type="text" placeholder="input" />
        <textarea class="${field.Textarea}" placeholder="textarea"></textarea>
        <button class="${button.Root}" type="button" data-end>End Trap</button>
      </div>
    </ark-focus-trap>`

  const trap = root.querySelector('ark-focus-trap')!
  root.querySelector('[data-start]')!.addEventListener('click', () => (trap.disabled = false))
  root.querySelector('[data-end]')!.addEventListener('click', () => (trap.disabled = true))
}
