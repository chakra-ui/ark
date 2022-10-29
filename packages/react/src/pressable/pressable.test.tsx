import { Pressable } from './pressable'
import { render, screen } from '@testing-library/react'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(<Pressable />)
    screen.getByRole('button')
  })
})
