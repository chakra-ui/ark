import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './accordion.test.vue'

describe('Accordion', () => {
  it('should open the accordion item on click', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('React trigger')).toHaveAttribute('aria-expanded', 'true')
  })
})
