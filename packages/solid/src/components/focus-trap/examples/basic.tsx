import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const Basic = () => {
  const [trapped, setTrapped] = createSignal(false)
  return (
    <>
      <button class={button.Root} type="button" onClick={() => setTrapped(true)}>
        Start Trap
      </button>
      <FocusTrap returnFocusOnDeactivate={false} disabled={!trapped()}>
        <div class="stack" style={{ 'padding-block': '1rem' }}>
          <input class={field.Input} type="text" placeholder="input" />
          <textarea class={field.Textarea} placeholder="textarea" />
          <button class={button.Root} type="button" onClick={() => setTrapped(false)}>
            End Trap
          </button>
        </div>
      </FocusTrap>
    </>
  )
}
