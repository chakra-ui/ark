import { checkboxAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Checkbox } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

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
    render(() => <ControlledComponentUnderTest />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())
  })
})
