import { Fieldset } from '@ark-ui/solid/fieldset'

export const Disabled = () => (
  <Fieldset.Root disabled>
    <Fieldset.Legend>Disabled Fieldset</Fieldset.Legend>
    <input type="text" placeholder="This input is disabled" />
    <Fieldset.HelperText>This fieldset is disabled</Fieldset.HelperText>
  </Fieldset.Root>
)
