import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { createSignal } from 'solid-js'

export const InitialFocus = () => {
  const [trapped, setTrapped] = createSignal(false)
  let inputRef: HTMLInputElement | undefined

  return (
    <div>
      <button onClick={() => setTrapped((v) => !v)}>{trapped() ? 'End Trap' : 'Start Trap'}</button>
      <FocusTrap disabled={!trapped()} initialFocus={() => inputRef}>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem',
            'padding-block': '1rem',
          }}
        >
          <input type="text" placeholder="First input" />
          <input ref={inputRef} type="text" placeholder="Second input (initial focus)" />
          <textarea placeholder="textarea" />
          <button onClick={() => setTrapped(false)}>End Trap</button>
        </div>
      </FocusTrap>
    </div>
  )
}
