import { switchAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './switch.test.vue'

describe('Switch', () => {
  it.each(getParts(switchAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should toggle state when clicked', async () => {
    const onCheckedChange = vi.fn()

    render(ComponentUnderTest, { props: { onCheckedChange } })

    const switchControl = screen.getByRole('checkbox')
    await user.click(switchControl)

    expect(onCheckedChange).toHaveBeenCalledWith({ checked: true })
  })

  it('should not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()

    render(ComponentUnderTest, { props: { onCheckedChange, disabled: true } })
    expect(screen.getByRole('checkbox')).toBeDisabled()

    const switchControl = screen.getByRole('checkbox')
    await user.click(switchControl)

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('should show invalid attribute when invalid', async () => {
    render(ComponentUnderTest, { props: { invalid: true } })
    const switchControl = screen.getByRole('checkbox')

    expect(switchControl).toHaveAttribute('aria-invalid', 'true')
  })

  it('should be required when required is true', async () => {
    render(ComponentUnderTest, { props: { required: true } })
    const switchControl = screen.getByRole('checkbox')

    expect(switchControl).toBeRequired()
  })
})
