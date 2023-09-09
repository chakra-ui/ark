import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import ComponentUnderTest from './toggle.test.vue'

describe('Toggle', () => {
  it('should render', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('should handle click event', async () => {
    const onChange = vi.fn()
    render(ComponentUnderTest, { props: { onChange } })
    const toggleButton = screen.getByText('B')
    await user.click(toggleButton)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ pressed: true }))
  })

  it('should handle disabled state', () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    const toggleButton = screen.getByText('B')
    expect(toggleButton).toBeDisabled()
  })

  it('should reflect initial pressed state', () => {
    render(ComponentUnderTest, { props: { pressed: true } })
    const toggleButton = screen.getByText('B')
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
  })
})
