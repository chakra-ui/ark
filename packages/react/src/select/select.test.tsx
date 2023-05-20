import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Portal } from '@zag-js/react'
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
  type SelectProps,
} from './'

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
          <SelectTrigger>{selectedOption?.label ?? 'Select option'}</SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectContent>
                {options.map((option, id) => (
                  <SelectOption key={id} {...option}>
                    <span>{option.label}</span>
                    {option.value === selectedOption?.value && '✓'}
                  </SelectOption>
                ))}
              </SelectContent>
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

  it('should allow to select a option', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'Angular' })).not.toBeVisible()
    await user.click(screen.getByText('Select option'))
    await user.click(screen.getByRole('option', { name: 'Angular' }))

    expect(screen.queryByText('Select option')).not.toBeInTheDocument()
  })
})
