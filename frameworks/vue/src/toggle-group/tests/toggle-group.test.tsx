import { toggleGroupAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import { ToggleGroup } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './toggle-group.test.vue'

describe('ToggleGroup', () => {
  it.each(getParts(toggleGroupAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(toggleGroupAnatomy))('should export %s', async (part) => {
    expect(ToggleGroup[part]).toBeDefined()
  })

  it('should handle default value', () => {
    render(ComponentUnderTest, { props: { modelValue: ['a'] } })
    expect(screen.getByText('A')).toBeChecked()
  })

  it('should handle onValueChange', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await user.click(screen.getByText('A'))
    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['a'] }))
  })

  it('should handle multiple selection', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange, multiple: true } })

    await user.click(screen.getByText('A'))
    await user.click(screen.getByText('B'))

    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ['a', 'b'] }))
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
