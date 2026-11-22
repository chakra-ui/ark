import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { Show, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const Autofocus = () => {
  const [trapped, setTrapped] = createSignal(false)
  let buttonRef!: HTMLButtonElement

  return (
    <div>
      <button class={button.Root} type="button" ref={buttonRef} onClick={() => setTrapped((v) => !v)}>
        {trapped() ? 'End Trap' : 'Start Trap'}
      </button>
      <Show when={trapped()}>
        <FocusTrap disabled={!trapped()} setReturnFocus={buttonRef}>
          <div class="stack" style={{ 'padding-block': '1rem' }}>
            <input class={field.Input} type="text" placeholder="Regular input" />
            <input class={field.Input} type="text" placeholder="Autofocused input" autofocus />
            <button class={button.Root} type="button" onClick={() => setTrapped(false)}>
              End Trap
            </button>
          </div>
        </FocusTrap>
      </Show>
    </div>
  )
}
