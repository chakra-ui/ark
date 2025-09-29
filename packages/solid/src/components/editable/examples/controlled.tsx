import { Editable } from '@ark-ui/solid/editable'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal('Testing')

  return (
    <>
      <button onClick={() => setValue('Chakra')}>Set to Chakra</button>
      <p>Current value: {value()}</p>
      <Editable.Root value={value()} onValueChange={(details) => setValue(details.value)}>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
      </Editable.Root>
    </>
  )
}
