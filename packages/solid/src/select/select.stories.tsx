import { For, Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectOptionGroup,
  SelectOptionGroupLabel,
  SelectPositioner,
  SelectTrigger,
} from '.'
import './select.css'

const meta: Meta = {
  title: 'Select',
}

export default meta

export const Basic = () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ]
  return (
    <Select>
      {(api) => (
        <>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>{api().selectedOption?.label ?? 'Select option'}</SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectContent>
                <SelectOptionGroup id="framework">
                  <SelectOptionGroupLabel htmlFor="framework">Frameworks</SelectOptionGroupLabel>
                  <For each={options}>{(option) => <SelectOption {...option} />}</For>
                </SelectOptionGroup>
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </>
      )}
    </Select>
  )
}
