import { checkboxAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Checkbox } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './checkbox.test.vue'
import ControlledComponentUnderTest from './controlled-checkbox.test.vue'

describe('Checkbox', () => {
  it.each(getParts(checkboxAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(checkboxAnatomy))('should export %s', async (part) => {
    expect(Checkbox[part]).toBeDefined()
  })

  it('should handle check and unchecked', async () => {
    const onCheckedChange = vi.fn()
    render(ComponentUnderTest, { props: { onCheckedChange } })

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should allow controlled usage', async () => {
    render(ControlledComponentUnderTest)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText('set checked'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should handle indeterminate state from example', async () => {
    render(ComponentUnderTest, { props: { modelValue: 'indeterminate' } })
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })
})
