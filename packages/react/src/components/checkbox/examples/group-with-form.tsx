import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const GroupWithForm = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      console.log(new FormData(e.currentTarget).getAll('framework'))
    }}
  >
    <Checkbox.Group defaultValue={['react']} name="framework">
      {items.map((item) => (
        <Checkbox.Root value={item.value} key={item.value}>
          <Checkbox.Label>{item.label}</Checkbox.Label>
          <Checkbox.Control>
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      ))}
    </Checkbox.Group>
    <button type="submit">Submit</button>
  </form>
)
