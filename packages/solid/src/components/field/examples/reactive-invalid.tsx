import { Field } from '@ark-ui/solid/field'
import { createSignal, createMemo } from 'solid-js'

export const ReactiveInvalid = () => {
  const [errorMessage, setErrorMessage] = createSignal('')
  const invalid = createMemo(() => !!errorMessage())

  return (
    <>
      <input value={errorMessage()} onInput={(e) => setErrorMessage(e.currentTarget.value)} />
      <Field.Root invalid={invalid()}>
        IsInvalid? {invalid() ? 'true' : 'false'}
        <Field.ErrorText style={{ color: 'red' }}>{errorMessage()}</Field.ErrorText>
      </Field.Root>
    </>
  )
}
