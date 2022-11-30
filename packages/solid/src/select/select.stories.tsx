import { Portal } from 'solid-js/web'
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
      {({ selectedOption }) => (
        <>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>
            <span>{selectedOption?.label ?? 'Select option'}</span>
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectMenu>
                {options.map((option) => (
                  <SelectOption {...option}>
                    <span>{option.label}</span>
                    {option.value === selectedOption?.value && '✓'}
                  </SelectOption>
                ))}
              </SelectMenu>
            </SelectPositioner>
          </Portal>
        </>
      )}
    </Select>
  )
}
