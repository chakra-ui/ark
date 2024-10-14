import { PinInput, usePinInput } from '@ark-ui/solid/pin-input'
import { Index } from 'solid-js'

export const RootProvider = () => {
  const pinInput = usePinInput({ onValueComplete: (e) => alert(e.valueAsString) })

  return (
    <>
      <button onClick={() => pinInput().focus()}>Focus</button>

      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </>
  )
}
