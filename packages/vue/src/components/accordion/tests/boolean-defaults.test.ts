import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './boolean-defaults.test.vue'

describe('Accordion / boolean prop defaults', () => {
  it('should inherit disabled from the root when the item omits it', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })
    expect(screen.getByRole('button', { name: 'React Trigger' })).toBeDisabled()
  })
})
