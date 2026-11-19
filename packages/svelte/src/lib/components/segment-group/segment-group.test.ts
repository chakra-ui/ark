import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import BindableComponentUnderTest from './tests/segment-group-bindable.test.svelte'
import ComponentUnderTest from './tests/segment-group.test.svelte'

describe('SegmentGroup', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should label the group', () => {
    render(ComponentUnderTest)

    expect(screen.getByRole('radiogroup')).toHaveAccessibleName('Framework')
  })

  it('should select an item when clicked and invoke onValueChange', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await user.click(screen.getByLabelText('Solid'))

    expect(screen.getByLabelText('Solid')).toBeChecked()
    expect(screen.getByTestId('item-solid')).toHaveAttribute('data-state', 'checked')
    expect(onValueChange).toHaveBeenCalledWith({ value: 'solid' })
  })

  it('should not select a disabled item', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await user.click(screen.getByLabelText('Svelte'))

    expect(screen.getByLabelText('Svelte')).not.toBeChecked()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should start from defaultValue', () => {
    render(ComponentUnderTest, { props: { defaultValue: 'vue' } })

    expect(screen.getByLabelText('Vue')).toBeChecked()
  })

  it('should disable every item when the group is disabled', () => {
    render(ComponentUnderTest, { props: { disabled: true } })

    for (const radio of screen.getAllByRole('radio')) expect(radio).toBeDisabled()
  })

  it('should set the radio group data attributes it is built on', () => {
    render(ComponentUnderTest)

    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-radio-group-root')
    expect(screen.getByTestId('item-react')).toHaveAttribute('data-radio-group-item')
    expect(screen.getByText('Framework')).toHaveAttribute('data-radio-group-label')
  })

  it('should follow and write back bind:value', async () => {
    render(BindableComponentUnderTest)

    expect(screen.getByLabelText('react')).toBeChecked()

    await user.click(screen.getByText('select vue'))
    await waitFor(() => expect(screen.getByLabelText('vue')).toBeChecked())

    await user.click(screen.getByLabelText('solid'))
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('solid'))
  })
})
