import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import BindableComponentUnderTest from './tests/toggle-group-bindable.test.svelte'
import ComponentUnderTest from './tests/toggle-group.test.svelte'

describe('ToggleGroup', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should start from defaultValue', () => {
    render(ComponentUnderTest, { props: { defaultValue: ['a'] } })

    expect(screen.getByText('A')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('B')).toHaveAttribute('aria-pressed', 'false')
  })

  it('should invoke onValueChange', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await user.click(screen.getByText('A'))
    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['a'] }))
  })

  it('should keep a single item pressed unless multiple', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('A'))
    await user.click(screen.getByText('B'))

    expect(screen.getByText('A')).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('B')).toHaveAttribute('aria-pressed', 'true')
  })

  it('should allow multiple selection', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { multiple: true, onValueChange } })

    await user.click(screen.getByText('A'))
    await user.click(screen.getByText('B'))
    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['a', 'b'] }))
  })

  it('should disable every item when disabled', () => {
    render(ComponentUnderTest, { props: { disabled: true } })

    for (const label of ['A', 'B', 'C']) expect(screen.getByText(label)).toBeDisabled()
  })

  it('should loop focus by default', async () => {
    render(ComponentUnderTest)

    screen.getByText('C').focus()
    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(screen.getByText('A')).toHaveFocus())
  })

  it('should not loop focus when loopFocus is false', async () => {
    render(ComponentUnderTest, { props: { loopFocus: false } })

    screen.getByText('C').focus()
    await user.keyboard('[ArrowRight][ArrowLeft]')

    await waitFor(() => expect(screen.getByText('B')).toHaveFocus())
  })

  it('should set the merged data attributes', () => {
    render(ComponentUnderTest)

    expect(screen.getByTestId('root')).toHaveAttribute('data-toggle-group-root')
    expect(screen.getByText('A')).toHaveAttribute('data-toggle-group-item')
  })

  it('should follow and write back bind:value', async () => {
    render(BindableComponentUnderTest)

    expect(screen.getByText('A')).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByText('select c'))
    await waitFor(() => expect(screen.getByText('C')).toHaveAttribute('aria-pressed', 'true'))

    await user.click(screen.getByText('B'))
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('b'))
  })
})
