import { FocusTrap } from '@ark-ui/react/focus-trap'
import { useRef, useState } from 'react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const Autofocus = () => {
  const [trapped, setTrapped] = useState(false)
  const toggle = () => setTrapped((c) => !c)

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const getButtonNode = () => {
    const node = buttonRef.current
    if (!node) throw new Error('Button not found')
    return node
  }

  return (
    <div>
      <button className={button.Root} type="button" ref={buttonRef} onClick={toggle}>
        {trapped ? 'End Trap' : 'Start Trap'}
      </button>
      {trapped && (
        <FocusTrap disabled={!trapped} setReturnFocus={getButtonNode}>
          <div className="stack" style={{ paddingBlock: '1rem' }}>
            <input className={field.Input} type="text" placeholder="Regular input" />
            {/* biome-ignore lint/a11y/noAutofocus: intentional */}
            <input className={field.Input} type="text" placeholder="Autofocused input" autoFocus />
            <button className={button.Root} type="button" onClick={() => setTrapped(false)}>
              End Trap
            </button>
          </div>
        </FocusTrap>
      )}
    </div>
  )
}
