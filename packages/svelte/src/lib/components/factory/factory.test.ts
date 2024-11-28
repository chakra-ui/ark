import { render, screen } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Ark Factory', () => {
  it('should render only the child', () => {
    render(ComponentUnderTest)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    expect(child.dataset['part']).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'rgb(0, 0, 255)' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Ark UI')).toBeVisible()
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(ComponentUnderTest, { onClickParent, onClickChild })
    await user.click(screen.getByTestId('child'))

    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })
})
