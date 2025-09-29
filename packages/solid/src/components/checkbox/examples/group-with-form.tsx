import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { For } from 'solid-js'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
]

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  console.log(formData.getAll('framework'))
}

export const GroupWithForm = () => (
  <form onSubmit={handleSubmit}>
    <Checkbox.Group defaultValue={['react']} name="framework">
      <For each={items}>
        {(item) => (
          <Checkbox.Root value={item.value}>
            <Checkbox.Label>{item.label}</Checkbox.Label>
            <Checkbox.Control>
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        )}
      </For>
    </Checkbox.Group>
    <button type="submit">Submit</button>
  </form>
)
