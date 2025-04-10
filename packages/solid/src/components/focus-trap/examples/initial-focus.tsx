import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { createSignal } from 'solid-js'

export const InitialFocus = () => {
  const [trapped, setTrapped] = createSignal(false)
  const toggle = () => setTrapped((v) => !v)

  let inputRef!: HTMLInputElement

  return (
    <div>
      <button onClick={toggle}>{trapped() ? 'End Trap' : 'Start Trap'}</button>
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
          <button onClick={toggle}>End Trap</button>
        </div>
      </FocusTrap>
    </div>
  )
}
