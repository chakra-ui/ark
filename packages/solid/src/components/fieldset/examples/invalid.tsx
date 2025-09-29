import { Fieldset } from '@ark-ui/solid/fieldset'

export const Invalid = () => (
  <Fieldset.Root invalid>
    <Fieldset.Legend>Invalid Fieldset</Fieldset.Legend>
    <input type="email" value="invalid-email" />
    <Fieldset.ErrorText>Please provide a valid email address</Fieldset.ErrorText>
  </Fieldset.Root>
)
