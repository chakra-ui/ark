import { render, screen } from '@testing-library/vue'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './progress.test.vue'

describe('Progress', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should handle value', async () => {
    render(ComponentUnderTest, {
      props: {
        defaultValue: 42,
      },
    })

    screen.getByText('42%')
  })

  it('should handle custom max range', async () => {
    render(ComponentUnderTest, {
      props: {
        defaultValue: 30,
        max: 30,
      },
    })

    screen.getByText('100%')
  })

  it('should emit value changes from context setValue', async () => {
    const { emitted } = render(ComponentUnderTest)

    await user.click(screen.getByRole('button', { name: 'Set value' }))

    expect(emitted('valueChange')).toEqual([[{ value: 80 }]])
    expect(emitted('update:modelValue')).toEqual([[80]])
  })
})
