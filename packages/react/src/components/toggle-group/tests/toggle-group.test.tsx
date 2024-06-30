import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { anatomy } from '@zag-js/toggleGroup'
import { axe } from 'vitest-axe'
import { ToggleGroup } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('ToggleGroup / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(ToggleGroup[part]).toBeDefined()
  })
})

describe('ToggleGroup', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
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
    render(<ComponentUnderTest loopFocus={false} />)

    const firstToggle = screen.getByText('A')
    const lastToggle = screen.getByText('C')

    await user.click(lastToggle)
    await waitFor(() => expect(lastToggle).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstToggle).not.toHaveFocus())
    expect(lastToggle).toHaveFocus()
  })
})
