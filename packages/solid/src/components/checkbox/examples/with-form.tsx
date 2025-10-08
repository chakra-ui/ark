import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log('terms:', formData.get('terms'))
}

export const WithForm = () => (
  <form onSubmit={handleSubmit}>
    <Checkbox.Root name="terms" value="accepted">
      <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <button type="submit">Submit</button>
  </form>
)
