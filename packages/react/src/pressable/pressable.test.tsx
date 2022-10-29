import { render, screen } from '@testing-library/react'
import { Pressable } from './pressable'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(<Pressable />)
    screen.getByRole('button')
  })
})
