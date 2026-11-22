import { FocusTrap } from '@ark-ui/react/focus-trap'
import { useRef, useState } from 'react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const InitialFocus = () => {
  const [trapped, setTrapped] = useState(false)
  const toggle = () => setTrapped((c) => !c)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <button className={button.Root} type="button" onClick={toggle}>
        {trapped ? 'End Trap' : 'Start Trap'}
      </button>
      <FocusTrap disabled={!trapped} initialFocus={() => inputRef.current}>
        <div className="stack" style={{ paddingBlock: '1rem' }}>
          <input className={field.Input} type="text" placeholder="First input" />
          <input className={field.Input} ref={inputRef} type="text" placeholder="Second input (initial focus)" />
          <textarea className={field.Textarea} placeholder="textarea" />
          <button className={button.Root} type="button" onClick={() => setTrapped(false)}>
            End Trap
          </button>
        </div>
      </FocusTrap>
    </div>
  )
}
