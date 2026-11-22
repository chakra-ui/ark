import { FocusTrap } from '@ark-ui/react/focus-trap'
import { useState } from 'react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'

export const Basic = () => {
  const [trapped, setTrapped] = useState(false)
  return (
    <>
      <button className={button.Root} type="button" onClick={() => setTrapped(true)}>
        Start Trap
      </button>
      <FocusTrap returnFocusOnDeactivate={false} disabled={!trapped}>
        <div className="stack" style={{ paddingBlock: '1rem' }}>
          <input className={field.Input} type="text" placeholder="input" />
          <textarea className={field.Textarea} placeholder="textarea" />
          <button className={button.Root} type="button" onClick={() => setTrapped(false)}>
            End Trap
          </button>
        </div>
      </FocusTrap>
    </>
  )
}
