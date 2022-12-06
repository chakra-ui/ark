import { render, screen } from 'solid-testing-library'
import { Pressable } from './pressable'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(() => <Pressable />)
    screen.getByRole('button')
  })
})
