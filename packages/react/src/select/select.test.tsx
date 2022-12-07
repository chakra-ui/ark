import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Portal } from '@zag-js/react'
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
        <>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>
            <span>{selectedOption?.label ?? 'Select option'}</span>
          </SelectTrigger>
          <Portal>
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
          </Portal>
        </>
      )}
    </Select>
  )
}

describe('Select', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should show options on click', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
    await user.click(screen.getByText('Select option'))
    expect(screen.getByRole('option', { name: 'Angular' })).toBeVisible()
  })

  // TODO
  // stderr | src/select/select.test.tsx > Select > should allow to select a option
  // Error: Uncaught [Error: Could not find the menu element.]
  it('should allow to select a option', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
    await user.click(screen.getByText('Select option'))
    await user.click(screen.getByRole('option', { name: 'Angular' }))

    expect(screen.queryByText('Select option')).not.toBeInTheDocument()
  })
})
