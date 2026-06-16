import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest } from './tests/basic.tsx'

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

  it('should call onResizeEnd callback', async () => {
    // happy-dom reports a zero-sized layout, so the splitter machine cannot
    // resolve panel sizes. Mock the measured rect so keyboard resizing works.
    const rectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 300,
      height: 300,
      top: 0,
      left: 0,
      right: 300,
      bottom: 300,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)

    const onResizeEnd = vi.fn()
    render(<ComponentUnderTest onResizeEnd={onResizeEnd} />)

    const trigger = screen.getByRole('separator')

    trigger.focus()
    await user.keyboard('{ArrowRight}')

    expect(onResizeEnd).toHaveBeenCalled()

    rectSpy.mockRestore()
  })
})
