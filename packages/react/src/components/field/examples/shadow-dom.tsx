import { Field } from '@ark-ui/react/field'
import root from 'react-shadow'
import { EnvironmentProvider } from '../../../providers'

// biome-ignore lint/complexity/useLiteralKeys: <explanation>
const Host = root['div']

export const ShadowDom = () => (
  <Host>
    <EnvironmentProvider>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input placeholder="me@example.com" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
    </EnvironmentProvider>
  </Host>
)
