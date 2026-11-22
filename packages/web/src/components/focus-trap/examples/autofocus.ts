import '@ark-ui/web/focus-trap'

import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <div>
      <button class="${button.Root}" type="button">Start Trap</button>
      <template>
        <ark-focus-trap>
          <div class="stack" style="padding-block: 1rem">
            <input class="${field.Input}" type="text" placeholder="Regular input" />
            <input class="${field.Input}" type="text" placeholder="Autofocused input" autofocus />
            <button class="${button.Root}" type="button">End Trap</button>
          </div>
        </ark-focus-trap>
      </template>
    </div>`

  const toggle = root.querySelector('button')!
  const template = root.querySelector('template')!
  let trap: HTMLElement | null = null

  const setTrapped = (trapped: boolean) => {
    toggle.textContent = trapped ? 'End Trap' : 'Start Trap'

    if (!trapped) {
      trap?.remove()
      trap = null
      return
    }

    const fragment = document.importNode(template.content, true)
    const element = fragment.querySelector('ark-focus-trap')!
    element.setReturnFocus = () => toggle
    element.querySelector('button')!.addEventListener('click', () => setTrapped(false))
    template.before(fragment)
    trap = element
  }

  toggle.addEventListener('click', () => setTrapped(!trap))
}
