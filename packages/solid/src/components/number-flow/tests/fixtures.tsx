import { createSignal } from 'solid-js'
import { NumberFlow, type UseNumberFlowProps, useNumberFlow } from '../index.tsx'

export const Controlled = () => {
  const [value, setValue] = createSignal(99)
  return (
    <>
      <NumberFlow.Root value={value()} locale="en-US">
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <button onClick={() => setValue(1000)}>Update</button>
    </>
  )
}

export const Provider = (props: UseNumberFlowProps) => {
  const numberFlow = useNumberFlow(props)
  return (
    <>
      <NumberFlow.RootProvider value={numberFlow}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.RootProvider>
      <button onClick={() => numberFlow().setValue(13.5)}>Update</button>
    </>
  )
}
