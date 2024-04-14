import { radioGroupAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { RadioGroup } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './radio-group.test.vue'

describe('Radio Group', () => {
  it.each(getParts(radioGroupAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(radioGroupAnatomy))('should export %s', async (part) => {
    expect(RadioGroup[part]).toBeDefined()
  })

  it('should invoke onValueChange if another value has selected', async () => {
    const onValueChange = vi.fn()

    render(ComponentUnderTest, {
      props: {
        onValueChange,
      },
    })

    await user.click(screen.getByLabelText('Solid'))
    expect(onValueChange).toHaveBeenCalledWith({ value: 'solid' })
  })

  it('should not invoke onValueChange if option is disabled', async () => {
    const onValueChange = vi.fn()

    render(ComponentUnderTest, {
      props: {
        onValueChange,
      },
    })

    await user.click(screen.getByLabelText('Svelte'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
