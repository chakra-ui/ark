import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './pressable.test.vue'

describe('Pressable', () => {
  it('should have the correct aria role', () => {
    render(ComponentUnderTest)
    screen.getByRole('button')
  })
})
