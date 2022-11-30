import { render, screen } from '@testing-library/react'
import { Select, SelectProps } from './select'
import { SelectLabel } from './select-label'
import { SelectMenu } from './select-menu'
import { SelectOption } from './select-option'
import { SelectPositioner } from './select-positioner'
import { SelectTrigger } from './select-trigger'

const ComponentUnderTest = (props: SelectProps) => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ]
  return (
    <Select {...props}>
      {({ selectedOption }) => (
        <div>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>
            <span>{selectedOption?.label ?? 'Select option'}</span>
          </SelectTrigger>

          <SelectPositioner>
            <SelectMenu>
              {options.map((option, id) => (
                <SelectOption key={id} {...option}>
                  <span>{option.label}</span>
                  {option.value === selectedOption?.value && '✓'}
                </SelectOption>
              ))}
            </SelectMenu>
          </SelectPositioner>
        </div>
      )}
    </Select>
  )
}

describe('Select', () => {
  it('should render', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('Framework:')).toBeInTheDocument()
    expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    expect(screen.getByRole('option', { hidden: true, name: 'Vue' })).not.toBeVisible()
  })
})
