import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Toggle, ToggleGroup, type ToggleGroupProps } from './'

const ComponentUnderTest = (props: ToggleGroupProps) => (
  <ToggleGroup {...props}>
    <Toggle value="a">A</Toggle>
    <Toggle value="b">B</Toggle>
    <Toggle value="c">C</Toggle>
  </ToggleGroup>
)

describe('Toggle', () => {
  it('should render', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('should handle default value', () => {
    render(<ComponentUnderTest defaultValue={['a']} />)
    expect(screen.getByText('A')).toBeChecked()
  })

  it('should handle onValueChange', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)
    await user.click(screen.getByText('A'))
    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['a'] }))
  })

  it('should handle multiple selection', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest multiple onValueChange={onValueChange} />)
    await user.click(screen.getByText('A'))
    await user.click(screen.getByText('B'))
    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['a', 'b'] }))
  })

  it('should handle disabled state', () => {
    render(<ComponentUnderTest disabled />)
    expect(screen.getByText('A')).toBeDisabled()
    expect(screen.getByText('B')).toBeDisabled()
    expect(screen.getByText('C')).toBeDisabled()
  })

  it('should loop focus by default', async () => {
    render(<ComponentUnderTest />)
    const firstToggle = screen.getByText('A')
    const lastToggle = screen.getByText('C')

    await user.click(lastToggle)
    await waitFor(() => expect(lastToggle).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstToggle).toHaveFocus())
  })

  it('should not loop focus if disabled', async () => {
    render(<ComponentUnderTest loop={false} />)
    const firstToggle = screen.getByText('A')
    const lastToggle = screen.getByText('C')

    await user.click(lastToggle)
    await waitFor(() => expect(lastToggle).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstToggle).not.toHaveFocus())
    expect(lastToggle).toHaveFocus()
  })
})
