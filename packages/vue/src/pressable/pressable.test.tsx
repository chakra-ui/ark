import { render, screen } from '@testing-library/vue'
import Component from './pressable.story.vue'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(Component)
    screen.getByRole('button')
  })
})
