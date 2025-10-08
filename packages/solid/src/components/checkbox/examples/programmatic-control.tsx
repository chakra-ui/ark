import { Checkbox, useCheckbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'

export const ProgrammaticControl = () => {
  const checkbox = useCheckbox()

  return (
    <>
      <button type="button" onClick={() => checkbox().setChecked(true)}>
        Check
      </button>
      <button type="button" onClick={() => checkbox().setChecked(false)}>
        Uncheck
      </button>

      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.RootProvider>
    </>
  )
}
