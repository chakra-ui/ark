import { checkboxAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { createSignal } from 'solid-js'
import { vi } from 'vitest'
import { getExports, getParts } from '../setup-test'
import { Checkbox, type CheckboxRootProps } from './'

const ComponentUnderTest = (props: CheckboxRootProps) => (
  <Checkbox.Root {...props}>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control" />
    <Checkbox.Indicator>Indicator</Checkbox.Indicator>
  </Checkbox.Root>
)

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(checkboxAnatomy))('should export %s', async (part) => {
    expect(Checkbox[part]).toBeDefined()
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(() => <ComponentUnderTest onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should invoke onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(() => <ComponentUnderTest onCheckedChange={onCheckedChange} />)

    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: true }))

    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: false }))
  })

  it('should handle indeterminate state properly', async () => {
    render(() => <ComponentUnderTest checked="indeterminate" />)
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })

  it('should allow controlled usage', async () => {
    const ControlledComponentUnderTest = () => {
      const [checked, setChecked] = createSignal(false)
      return (
        <>
          <button onClick={() => setChecked(true)}>set checked</button>
          <ComponentUnderTest checked={checked()} />
        </>
      )
    }
    render(() => <ControlledComponentUnderTest />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())
  })
})
