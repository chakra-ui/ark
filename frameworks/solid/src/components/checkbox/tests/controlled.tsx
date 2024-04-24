import { createSignal } from 'solid-js'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = () => {
  const [checked, setChecked] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setChecked(true)}>
        set checked
      </button>
      <ComponentUnderTest checked={checked()} />
    </>
  )
}
