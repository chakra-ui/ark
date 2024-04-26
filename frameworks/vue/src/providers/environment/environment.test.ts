import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './examples/basic.vue'

describe('Environment', () => {
  it('should have access to the environment values', () => {
    render(ComponentUnderTest)

    expect(screen.getByLabelText('environment values').innerHTML).not.toBe('""')
  })
})
