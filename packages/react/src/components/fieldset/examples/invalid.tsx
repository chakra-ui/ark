import { Fieldset } from '@ark-ui/react/fieldset'

export const Invalid = () => (
  <Fieldset.Root invalid>
    <Fieldset.Legend>Invalid Fieldset</Fieldset.Legend>
    <input type="email" defaultValue="invalid-email" />
    <Fieldset.ErrorText>Please provide a valid email address</Fieldset.ErrorText>
  </Fieldset.Root>
)
