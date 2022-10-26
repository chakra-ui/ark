import { Pressable } from './pressable'
import { fireEvent, render, screen } from '@testing-library/react'
import { vitest } from 'vitest'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(<Pressable />)
    screen.getByRole('button')
  })

  it('should trigger the onPress callback', () => {
    const onPressMock = vitest.fn()
    render(<Pressable onPress={onPressMock} />)
    const pressable = screen.getByRole('button')
    fireEvent.click(pressable)
    // well ok its late, but this should not fail.
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
