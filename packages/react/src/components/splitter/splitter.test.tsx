import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './tests/basic'

describe('Splitter', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render the component', () => {
    const { getByText } = render(<ComponentUnderTest />)

    expect(getByText('A')).toBeInTheDocument()
    expect(getByText('B')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it.skip('should call onResizeStart callback', () => {
    const onResizeStart = vi.fn()
    render(<ComponentUnderTest onResizeEnd={onResizeStart} />)

    const trigger = screen.getByRole('separator')

    trigger.focus()
    user.keyboard('{ArrowRight}')

    expect(onResizeStart).toHaveBeenCalled()
  })
})
