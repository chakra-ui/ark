import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const InitialFocus = () => {
  const [trapped, setTrapped] = createSignal(false)
  const toggle = () => setTrapped((v) => !v)

  let inputRef!: HTMLInputElement

  return (
    <div>
      <button class={button.Root} type="button" onClick={toggle}>
        {trapped() ? 'End Trap' : 'Start Trap'}
      </button>
      <FocusTrap disabled={!trapped()} initialFocus={() => inputRef}>
        <div class="stack" style={{ 'padding-block': '1rem' }}>
          <input class={field.Input} type="text" placeholder="First input" />
          <input class={field.Input} ref={inputRef} type="text" placeholder="Second input (initial focus)" />
          <textarea class={field.Textarea} placeholder="textarea" />
          <button class={button.Root} type="button" onClick={toggle}>
            End Trap
          </button>
        </div>
      </FocusTrap>
    </div>
  )
}
