import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import { Pressable } from './pressable'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(<Pressable />)
    screen.getByRole('button')
  })

  it('should call onPress', async () => {
    const onPress = vi.fn()
    render(<Pressable onPress={onPress} />)

    const button = screen.getByRole('button')
    await user.click(button)

    await waitFor(() => expect(onPress).toHaveBeenCalledOnce())
    // => what is happening here? user.click should trigger all pointer events ?!
  })
})
