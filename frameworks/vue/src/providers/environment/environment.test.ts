import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './examples/basic.vue'

describe('Environment', () => {
  it('should have access to the environment values', () => {
    render(ComponentUnderTest)

    expect(screen.getByTestId('output').innerHTML).not.toBe('""')
  })
})
