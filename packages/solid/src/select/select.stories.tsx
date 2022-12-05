import { For, Portal } from 'solid-js/web'
import { Select } from './select'
import { SelectLabel } from './select-label'
import { SelectMenu } from './select-menu'
import { SelectOption } from './select-option'
import { SelectPositioner } from './select-positioner'
import { SelectTrigger } from './select-trigger'

export const Basic = () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ]
  return (
    <Select>
      {(context) => (
        <div>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>
            <span>{context().selectedOption?.label ?? 'Select option'}</span>
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectMenu>
                <For each={options}>
                  {(option) => (
                    <SelectOption {...option}>
                      <span>{option.label}</span>
                      {option.value === context().selectedOption?.value && '✓'}
                    </SelectOption>
                  )}
                </For>
              </SelectMenu>
            </SelectPositioner>
          </Portal>
        </div>
      )}
    </Select>
  )
}
