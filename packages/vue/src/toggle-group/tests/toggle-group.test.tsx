import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import ComponentUnderTest from './toggle-group.test.vue'

describe('Toggle', () => {
  it('should render', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('should handle default value', () => {
    render(ComponentUnderTest, { props: { modelValue: ['a'] } })
    expect(screen.getByText('A')).toBeChecked()
  })

  it('should handle onChange', async () => {
    const onChange = vi.fn()
    render(ComponentUnderTest, { props: { onChange } })
    await user.click(screen.getByText('A'))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['a'] }))
  })

  it('should handle multiple selection', async () => {
    const onChange = vi.fn()
    render(ComponentUnderTest, { props: { onChange, multiple: true } })
    await user.click(screen.getByText('A'))
    await user.click(screen.getByText('B'))
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['a', 'b'] }))
  })

  it('should handle disabled state', () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByText('A')).toBeDisabled()
    expect(screen.getByText('B')).toBeDisabled()
    expect(screen.getByText('C')).toBeDisabled()
  })

  it('should loop focus by default', async () => {
    render(ComponentUnderTest)
    const firstToggle = screen.getByText('A')
    const lastToggle = screen.getByText('C')

    await user.click(lastToggle)
    await waitFor(() => expect(lastToggle).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstToggle).toHaveFocus())
  })

  it('should not loop focus if disabled', async () => {
    render(ComponentUnderTest, { props: { loop: false } })
    const firstToggle = screen.getByText('A')
    const lastToggle = screen.getByText('C')

    await user.click(lastToggle)
    await waitFor(() => expect(lastToggle).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstToggle).not.toHaveFocus())
    expect(lastToggle).toHaveFocus()
  })
})
