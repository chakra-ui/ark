import { PinInput, usePinInput } from '@ark-ui/react/pin-input'

export const RootProvider = () => {
  const pinInput = usePinInput({ onValueComplete: (e) => alert(e.valueAsString) })

  return (
    <>
      <button onClick={() => pinInput.focus()}>Focus</button>

      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Label</PinInput.Label>
        <PinInput.Control>
          {[0, 1, 2].map((id, index) => (
            <PinInput.Input key={id} index={index} />
          ))}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </>
  )
}
