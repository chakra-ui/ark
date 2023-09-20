import { checkboxAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { vi } from 'vitest'
import { getParts } from '../setup-test'
import { Checkbox, type CheckboxProps } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxIndicator } from './checkbox-indicator'
import { CheckboxLabel } from './checkbox-label'

const ComponentUnderTest = (props: Omit<CheckboxProps, 'children'>) => (
  <Checkbox {...props}>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxControl data-testid="control">
      <CheckboxIndicator />
    </CheckboxControl>
  </Checkbox>
)

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should handle indeterminate state properly', async () => {
    render(<ComponentUnderTest checked="indeterminate" />)
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })

  it('should allow controlled usage', async () => {
    const ControlledComponentUnderTest = () => {
      const [checked, setChecked] = useState(false)
      return (
        <>
          <button onClick={() => setChecked(true)}>set checked</button>
          <ComponentUnderTest checked={checked} />
        </>
      )
    }

    render(<ControlledComponentUnderTest />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())
  })
})
