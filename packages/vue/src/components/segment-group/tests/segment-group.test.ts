import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './segment-group.test.vue'

describe('Segment Group', () => {
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
