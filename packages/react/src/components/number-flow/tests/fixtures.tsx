import { NumberFlow, useNumberFlow, type UseNumberFlowProps } from '../index.ts'
import { useState } from 'react'

export const Controlled = () => {
  const [value, setValue] = useState(99)
  return (
    <>
      <NumberFlow.Root value={value} locale="en-US">
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
      <button onClick={() => numberFlow.setValue(13.5)}>Update</button>
    </>
  )
}

export const CustomSegments = () => (
  <NumberFlow.Root defaultValue={1234.5} locale="en-US">
    <NumberFlow.Segments>
      {(segment) =>
        segment.kind === 'digit' ? (
          <NumberFlow.Digit segment={segment} data-testid={`digit-${segment.place}`} />
        ) : (
          <NumberFlow.Symbol segment={segment} data-testid={`symbol-${segment.type}`} />
        )
      }
    </NumberFlow.Segments>
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
)
