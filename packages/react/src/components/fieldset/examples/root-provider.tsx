import { Fieldset, useFieldset } from '@ark-ui/react/fieldset'

export const RootProvider = () => {
  const fieldset = useFieldset({
    disabled: true,
  })
  return (
    <Fieldset.RootProvider value={fieldset}>
      <Fieldset.Legend>Legend</Fieldset.Legend>
      <Fieldset.HelperText>Helper text</Fieldset.HelperText>
      <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  )
}
