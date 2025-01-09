import { FocusTrap } from '@ark-ui/solid/focus-trap'
import { createSignal } from 'solid-js'

export const Basic = () => {
  const [trapped, setTrapped] = createSignal(false)
  return (
    <>
      <button onClick={() => setTrapped(true)}>Start Trap</button>
      <FocusTrap returnFocusOnDeactivate={false} disabled={!trapped()}>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem',
            'padding-block': '1rem',
          }}
        >
          <input type="text" placeholder="input" />
          <textarea placeholder="textarea" />
          <button onClick={() => setTrapped(false)}>End Trap</button>
        </div>
      </FocusTrap>
    </>
  )
}
