import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { vi } from 'vitest'
import { Checkbox, type CheckboxProps } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxInput } from './checkbox-input'
import { CheckboxLabel } from './checkbox-label'

const ComponentUnderTest = (props: Omit<CheckboxProps, 'children'>) => (
  <Checkbox {...props}>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl data-testid="control" />
  </Checkbox>
)

describe('Checkbox', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should handle indeterminate state properly', async () => {
    render(<ComponentUnderTest indeterminate />)
    expect(screen.getByTestId('control')).toHaveAttribute('data-indeterminate')
  })

  // TODO: https://chakraui.slack.com/archives/C0491R77XE1/p1681311591433489?thread_ts=1681298946.333949&cid=C0491R77XE1
  it.skip('should allow controlled usage', async () => {
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
