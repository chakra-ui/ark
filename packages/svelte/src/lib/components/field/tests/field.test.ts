import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import IdsItemTest from './field-ids-item.test.svelte'
import IdsTargetTest from './field-ids-target.test.svelte'
import TextareaRefTest from './field-textarea-ref.test.svelte'
import ComponentUnderTest from './field.test.svelte'

describe('Field / Input', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should set textbox as required', () => {
    render(ComponentUnderTest, { props: { required: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set textbox as disabled', () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
    expect(document.querySelector('[data-field-root]')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Label')).toHaveAttribute('data-disabled')
    expect(screen.getByText('Some additional Info')).toHaveAttribute('data-disabled')
  })

  it('should set textbox as readonly', () => {
    render(ComponentUnderTest, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Some additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeVisible()
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(expect.stringContaining('Error Info')),
    )
  })

  it('should focus on input when label is clicked', async () => {
    render(ComponentUnderTest)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', () => {
    render(ComponentUnderTest)
    expect(screen.getByText('Error Info')).not.toBeVisible()
  })

  it('should describe the textbox with only the helper text when valid', async () => {
    render(ComponentUnderTest)
    const textbox = screen.getByRole('textbox', { name: /label/i })
    await waitFor(() => expect(textbox).toHaveAccessibleDescription('Some additional Info'))
  })
})

describe('Field / Textarea', () => {
  it('should not detach the bound textarea ref on parent re-render', async () => {
    const onRef = vi.fn()
    render(TextareaRefTest, { props: { onRef } })
    await waitFor(() => expect(onRef).toHaveBeenLastCalledWith(expect.any(HTMLTextAreaElement)))

    const callsAfterMount = onRef.mock.calls.length
    await user.click(screen.getByRole('button', { name: /re-render/i }))
    await waitFor(() => expect(screen.getByText('Notes 1')).toBeInTheDocument())

    expect(onRef).toHaveBeenCalledTimes(callsAfterMount)
    expect(screen.getByRole('textbox')).toBe(onRef.mock.lastCall?.[0])
  })
})

describe('Field / ids', () => {
  it('should keep the label on the target item when ids.control is set', () => {
    render(IdsItemTest)
    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('id', 'custom-control')
  })

  it('should give ids.root to the root and ids.control to the control', () => {
    render(ComponentUnderTest, { props: { ids: { root: 'custom-root', control: 'custom-control' } } })
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('id', 'custom-control')
    expect(document.getElementById('custom-root')).toHaveAttribute('data-field-root')
  })

  it('should point the label at ids.control, which overrides target', () => {
    render(IdsTargetTest)
    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('id', 'custom-control')
  })
})
